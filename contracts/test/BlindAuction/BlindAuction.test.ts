import { expect } from 'chai';
import { ethers } from 'hardhat';

import { createInstances } from '../instance';
import { getSigners, initSigners } from '../signers';
import { deployBlindAuctionFixture, deployEncryptedERC20Fixture } from '../fixtures';

describe('BlindAuction', function () {
  before(async function () {
    // number of signers that should be created. 4 is dave, which is used for fee recipient so also needed
    await initSigners(4);
    this.signers = await getSigners();
    console.log(`signers: `, this.signers);
  });

  beforeEach(async function () {
    // Deploy ERC20 contract with Alice account
    const contractErc20 = await deployEncryptedERC20Fixture({deployer:this.signers.alice});
    this.erc20 = contractErc20;
    this.contractERC20Address = await contractErc20.getAddress();
    const instance = await createInstances(this.contractERC20Address, ethers, this.signers);

    // Mint with Alice account
    const transaction = await this.erc20.mint(1000);

    // Deploy blind auction
    const contractPromise = deployBlindAuctionFixture({
      beneficiary: this.signers.alice.address,
      erc20Contract: this.contractERC20Address,
      biddingTime: 1000000,
      deployer: this.signers.alice,    
      feeRecipient: this.signers.dave.address, 
      feePercentage: 100,  // Fee percentage in basis points (e.g., 100 = 1%)
    });

    const [contract] = await Promise.all([contractPromise, transaction.wait()]);

    // Transfer 100 tokens to Bob
    const encryptedTransferAmount = instance.alice.encrypt64(100);
    const tx = await this.erc20['transfer(address,bytes)'](this.signers.bob.address, encryptedTransferAmount);

    // Transfer 100 tokens to Carol
    const tx2 = await this.erc20['transfer(address,bytes)'](this.signers.carol.address, encryptedTransferAmount);
    await Promise.all([tx.wait(), tx2.wait()]);

    console.log(`before instance `);
    this.contractAddress = await contract.getAddress();
    this.blindAuction = contract;
    const instances = await createInstances(this.contractAddress, ethers, this.signers);
    console.log(`after instance `);
    this.instances = instances;
  });

  it.skip('should check Carol won the bid', async function () {
    const bobBidAmount = this.instances.bob.encrypt64(10);
    const carolBidAmount = this.instances.carol.encrypt64(20);

    // To be able to bid, we give approbation to
    // the blind auction to spend tokens on Bob's and Carol's behalf.
    const txeBobApprove = await this.erc20
      .connect(this.signers.bob)
      ['approve(address,bytes)'](this.contractAddress, bobBidAmount);
    const txCarolApprove = await this.erc20
      .connect(this.signers.carol)
      ['approve(address,bytes)'](this.contractAddress, carolBidAmount);
    await Promise.all([txeBobApprove.wait(), txCarolApprove.wait()]);

    // Need to add gasLimit to avoid a gas limit issue for two parallel bids
    // When two tx are consecutive in the same block, if the similar second is asking more gas the tx will fail
    // because the allocated gas will be the first one gas amount.
    // This is typically the case for the bid method and the if, else branch inside, i.e. the first bid has no further computation
    // concerning the highestBid but all the following need to check against the current one.
    const txCarolBid = await this.blindAuction.connect(this.signers.carol).bid(carolBidAmount, { gasLimit: 5000000 });
    const txBobBid = await this.blindAuction.connect(this.signers.bob).bid(bobBidAmount, { gasLimit: 5000000 });
    await Promise.all([txCarolBid.wait(), txBobBid.wait()]);

    // Stop the auction
    const txAliceStop = await this.blindAuction.connect(this.signers.alice).stop();
    await txAliceStop.wait();

    const tokenCarol = this.instances.carol.getPublicKey(this.contractAddress)!;
    const carolBidAmountCheckEnc = await this.blindAuction
      .connect(this.signers.carol)
      .getBid(tokenCarol.publicKey, tokenCarol.signature);
    const carolBidAmountCheckDec = this.instances.carol.decrypt(this.contractAddress, carolBidAmountCheckEnc);
    expect(carolBidAmountCheckDec).to.equal(20);

    const tokenBob = this.instances.bob.getPublicKey(this.contractAddress)!;
    const bobBidAmountCheckEnc = await this.blindAuction
      .connect(this.signers.bob)
      .getBid(tokenBob.publicKey, tokenBob.signature);
    const bobBidAmountCheckDec = this.instances.bob.decrypt(this.contractAddress, bobBidAmountCheckEnc);
    expect(bobBidAmountCheckDec).to.equal(10);

    const carolHighestBidEnc = await this.blindAuction
      .connect(this.signers.carol)
      .doIHaveHighestBid(tokenCarol.publicKey, tokenCarol.signature);
    const carolHighestBidDec = this.instances.carol.decrypt(this.contractAddress, carolHighestBidEnc);
    expect(carolHighestBidDec).to.equal(1);

    const bobHighestBidEnc = await this.blindAuction
      .connect(this.signers.bob)
      .doIHaveHighestBid(tokenBob.publicKey, tokenBob.signature);
    const bobHighestBidDec = this.instances.bob.decrypt(this.contractAddress, bobHighestBidEnc);
    expect(bobHighestBidDec).to.equal(0);

    const txCarolClaim = await this.blindAuction.connect(this.signers.carol).claim();
    await txCarolClaim.wait();

    const txCarolWithdraw = await this.blindAuction.connect(this.signers.carol).auctionEnd();
    await txCarolWithdraw.wait();

    const instance = await createInstances(this.contractERC20Address, ethers, this.signers);
    const tokenAlice = instance.alice.getPublicKey(this.contractERC20Address)!;
    const encryptedBalanceAlice = await this.erc20.balanceOf(
      this.signers.alice,
      tokenAlice.publicKey,
      tokenAlice.signature,
    );

    const balanceAlice = instance.alice.decrypt(this.contractERC20Address, encryptedBalanceAlice);
    expect(balanceAlice).to.equal(1000 - 100 - 100 + 20);
  });

  it('should check fees are transferred', async function () {
    const bobBidAmount = 10;
    const carolBidAmount = 20;

    const bobBidAmountEnc = this.instances.bob.encrypt64(bobBidAmount);
    const carolBidAmountEnc = this.instances.carol.encrypt64(carolBidAmount);

    // Approve the blind auction to spend tokens on Bob's and Carol's behalf.
    const txBobApprove = await this.erc20
      .connect(this.signers.bob)
      ['approve(address,bytes)'](this.contractAddress, bobBidAmountEnc);
    const txCarolApprove = await this.erc20
      .connect(this.signers.carol)
      ['approve(address,bytes)'](this.contractAddress, carolBidAmountEnc);
    await Promise.all([txBobApprove.wait(), txCarolApprove.wait()]);

    console.log('Bob Public Key:', this.instances.bob.getPublicKey(this.contractAddress));
    console.log('Carol Public Key:', this.instances.carol.getPublicKey(this.contractAddress));

    // Bob and Carol place bids
    const txCarolBid = await this.blindAuction.connect(this.signers.carol).bid(carolBidAmountEnc, { gasLimit: 5000000 });
    const txBobBid = await this.blindAuction.connect(this.signers.bob).bid(bobBidAmountEnc, { gasLimit: 5000000 });
    await Promise.all([txCarolBid.wait(), txBobBid.wait()]);

    // Stop the auction
    const txAliceStop = await this.blindAuction.connect(this.signers.alice).stop();
    await txAliceStop.wait();

    // Carol claims the auction item
    const txCarolClaim = await this.blindAuction.connect(this.signers.carol).claim();
    await txCarolClaim.wait();

    // End the auction and transfer the highest bid to the beneficiary
    const txAuctionEnd = await this.blindAuction.connect(this.signers.alice).auctionEnd();
    await txAuctionEnd.wait();

    // Check the balances after the auction
    const instance = await createInstances(this.contractERC20Address, ethers, this.signers);
    const tokenAlice = instance.alice.getPublicKey(this.contractERC20Address)!;
    const encryptedBalanceAlice = await this.erc20.balanceOf(
      this.signers.alice,
      tokenAlice.publicKey,
      tokenAlice.signature,
    );
    const balanceAlice = instance.alice.decrypt(this.contractERC20Address, encryptedBalanceAlice);
    const fee = Math.floor((carolBidAmount * 100) / 10000); // Calculate the fee as 1% of the bid
    console.log(`fee: `, fee);
    expect(balanceAlice).to.equal(1000 - 100 - 100 + carolBidAmount - fee);

    const tokenFeeRecipient = instance.alice.getPublicKey(this.contractERC20Address)!;
    const encryptedBalanceFeeRecipient = await this.erc20.balanceOf(
      this.signers.dave,
      tokenFeeRecipient.publicKey,
      tokenFeeRecipient.signature,
    );
    console.log(`encryptedBalanceFeeRecipient: `, encryptedBalanceFeeRecipient);
    const balanceFeeRecipient = instance.alice.decrypt(this.contractERC20Address, encryptedBalanceFeeRecipient);
    console.log(`balanceFeeRecipient: `, balanceFeeRecipient);
    expect(balanceFeeRecipient).to.equal(fee);
  });
});
