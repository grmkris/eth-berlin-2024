import {ActivityNFT, ActivityNFT__factory, ActivityNFTFactory, BlindAuction, BlindAuction__factory, EncryptedERC20} from "../../types";
import { deployActivityNftFactoryFixture, deployEncryptedERC20Fixture } from "../fixtures";
import { createInstances } from "../instance";
import { getSigners, initSigners } from "../signers";
import {expect} from "chai";
import {isAddress} from "ethers";
import { ethers } from 'hardhat';


describe.only("ActivityNFTFactory", function () {
    const FEE_BPS = 100; // 1%
    let activityNFTFactory: ActivityNFTFactory;
    let eerc20: EncryptedERC20;
    let eerc20Address: string;
    let blindAuction: BlindAuction;
    let blindAuctionAddress: string;
    let activityNFT: ActivityNFT;
    let activityNFTAddress: string;

    before(async function () {
        await initSigners(3);
        this.signers = await getSigners();
    });

    beforeEach(async function () {
        eerc20 = await deployEncryptedERC20Fixture({deployer:this.signers.alice});
        const contract = await deployActivityNftFactoryFixture();
        this.contractAddress = await contract.getAddress();
        activityNFTFactory = contract as ActivityNFTFactory;
        eerc20Address = await eerc20.getAddress();
        const instances = await createInstances(eerc20Address, ethers, this.signers);
        this.instances = instances;
        // Mint with Alice account
        const transaction = await eerc20.mint(10000);
        transaction.wait();

        // Transfer 1000 tokens to Bob
        const encryptedTransferAmount = instances.alice.encrypt64(1000);
        const tx = await eerc20['transfer(address,bytes)'](this.signers.bob.address, encryptedTransferAmount);

        // Transfer 1000 tokens to Carol
        const tx2 = await eerc20['transfer(address,bytes)'](this.signers.carol.address, encryptedTransferAmount);

        // Transfer 1000 tokens to Metamask
        const tx3 = await eerc20['transfer(address,bytes)']("0x08Ab1Ce3686cb7E616af2D3E068356B160c4c037", encryptedTransferAmount);
        await Promise.all([tx.wait(), tx2.wait(), tx3.wait()]);
    });

  it.only("should create a new ActivityNFT contract", async function () {
    const activityRight = "Sleep in Fhain for 2 weeks";
    const activityNFTFactoryAddress = await activityNFTFactory.getAddress();
    console.log(`activityNFTFactoryAddress: `, activityNFTFactoryAddress);
    console.log(`eerc20Address: `, eerc20Address);

    // create event listener
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await activityNFTFactory.on("ActivityNFTCreated", (activityNFTAddress) => {
      console.log("ActivityNFT created at address: ", activityNFTAddress);
    });
    // Call the createActivityNFT function
    const erc20Addr = await eerc20.getAddress();
    const result = await activityNFTFactory.createActivityNFT(activityRight, erc20Addr, 1000,
      this.signers.dave.address, 100)
    await result.wait()

    const filter = activityNFTFactory.filters["ActivityNFTCreated(address,address)"]
    const events = await activityNFTFactory.queryFilter(filter, -10)
    const event = events[0]
    expect(event.fragment.name).to.equal('ActivityNFTCreated')
    const args = event.args;
    activityNFTAddress = args[0];
    activityNFT = ActivityNFT__factory.connect(activityNFTAddress, this.signers.alice);
    blindAuctionAddress = args[1];
    blindAuction = BlindAuction__factory.connect(blindAuctionAddress, this.signers.alice);

    expect(isAddress(args[0])).to.be.true //activity NFT
    expect(isAddress(args[1])).to.be.true //auction address

    const instance = await createInstances(eerc20Address, ethers, this.signers);
    const tokenAlice = instance.alice.getPublicKey(eerc20Address)!;
    console.log(`Balances at start`);
    const aliceBalance = await eerc20.balanceOf(
      this.signers.alice,
      tokenAlice.publicKey,
      tokenAlice.signature,
    );
    console.log(`aliceBalance: `, instance.alice.decrypt(eerc20Address, aliceBalance));

    const tokenBob = instance.bob.getPublicKey(eerc20Address)!;
    const bobBalance = await eerc20.connect(this.signers.bob).balanceOf(
      this.signers.bob,
      tokenBob.publicKey,
      tokenBob.signature,
    );
    console.log(`bobBalance: `, instance.bob.decrypt(eerc20Address, bobBalance));

    const tokenCarol = instance.carol.getPublicKey(eerc20Address)!;
    const carolBalance = await eerc20.connect(this.signers.carol).balanceOf(
      this.signers.carol,
      tokenCarol.publicKey,
      tokenCarol.signature,
    );

    console.log(`carolBalance: `, instance.carol.decrypt(eerc20Address, carolBalance));

    const tokenDave = instance.dave.getPublicKey(eerc20Address)!;
    const daveBalance = await eerc20.connect(this.signers.dave).balanceOf(
      this.signers.dave,
      tokenDave.publicKey,
      tokenDave.signature,
    );

    console.log(`daveBalance: `, instance.dave.decrypt(eerc20Address, daveBalance));

    const bobBidAmount = 100;
    const carolBidAmount = 200;

    const bobBidAmountEnc = this.instances.bob.encrypt64(bobBidAmount);
    const carolBidAmountEnc = this.instances.carol.encrypt64(carolBidAmount);

    // Approve the blind auction to spend tokens on Bob's and Carol's behalf.
    console.log(`Approving the blind auction to spend tokens on Bob's and Carol's behalf`);
    const txeBobApprove = await eerc20
      .connect(this.signers.bob)
      ['approve(address,bytes)'](blindAuctionAddress, bobBidAmountEnc);
    const txCarolApprove = await eerc20
      .connect(this.signers.carol)
      ['approve(address,bytes)'](blindAuctionAddress, carolBidAmountEnc);
    await Promise.all([txeBobApprove.wait(), txCarolApprove.wait()]);


    // Bob and Carol place bids
    console.log(`Bob and Carol place bids`);
    const txCarolBid = await blindAuction.connect(this.signers.carol).bid(carolBidAmountEnc, { gasLimit: 5000000 });
    const txBobBid = await blindAuction.connect(this.signers.bob).bid(bobBidAmountEnc, { gasLimit: 5000000 });
    await Promise.all([txCarolBid.wait(), txBobBid.wait()]);

    // Stop the auction
    console.log(`Stop the auction`);
    const txAliceStop = await blindAuction.connect(this.signers.alice).stop();
    await txAliceStop.wait();

    // Carol claims the auction item
    console.log(`Carol claims the auction item`);
    const txCarolClaim = await blindAuction.connect(this.signers.carol).claim();
    await txCarolClaim.wait();

    // End the auction and transfer the highest bid to the beneficiary
    console.log(`End the auction and transfer the highest bid to the beneficiary`);
    const txAuctionEnd = await blindAuction.connect(this.signers.alice).auctionEnd();
    await txAuctionEnd.wait();

    // Check the balances after the auction
    console.log(`Check the balances after the auction`);
    const encryptedBalanceAlice = await eerc20.balanceOf(
      this.signers.alice,
      tokenAlice.publicKey,
      tokenAlice.signature,
    );
    const balanceAlice = instance.alice.decrypt(eerc20Address, encryptedBalanceAlice);
    const feeAmount = (carolBidAmount * FEE_BPS) / 10000; // Calculate the fee as 1% of the bid
    console.log(`feeAmount: `, feeAmount);
    console.log(`balanceAliceAfter: `, balanceAlice);

    const encryptedCarlolBalance = await eerc20.connect(this.signers.carol).balanceOf(
      this.signers.carol,
      tokenCarol.publicKey,
      tokenCarol.signature,
    );

    const balanceCarol = instance.carol.decrypt(eerc20Address, encryptedCarlolBalance);
    console.log(`balanceCarol: `, balanceCarol);

    const encryptedDaveBalance = await eerc20.connect(this.signers.dave).balanceOf(
      this.signers.dave,
      tokenDave.publicKey,
      tokenDave.signature,
    );
    console.log(`encryptedBalanceFeeRecipient: `, encryptedDaveBalance);
    const balanceFeeRecipient = instance.dave.decrypt(eerc20Address, encryptedDaveBalance);
    console.log(`balanceFeeRecipient: `, balanceFeeRecipient);
    expect(balanceFeeRecipient).to.equal(feeAmount);
    console.log(`Balances at end`);
    const aliceBalanceEnd = await eerc20.connect(this.signers.alice).balanceOf(
      this.signers.alice,
      tokenAlice.publicKey,
      tokenAlice.signature,
    );
    console.log(`aliceBalanceEnd: `, instance.alice.decrypt(eerc20Address, aliceBalanceEnd));
    const bobBalanceEnd = await eerc20.connect(this.signers.bob).balanceOf(
      this.signers.bob,
      tokenBob.publicKey,
      tokenBob.signature,
    );
    console.log(`bobBalanceEnd: `, instance.bob.decrypt(eerc20Address, bobBalanceEnd));
    const carolBalanceEnd = await eerc20.connect(this.signers.carol).balanceOf(
      this.signers.carol,
      tokenCarol.publicKey,
      tokenCarol.signature,
    );
    console.log(`carolBalanceEnd: `, instance.carol.decrypt(eerc20Address, carolBalanceEnd));
    const daveBalanceEnd = await eerc20.connect(this.signers.dave).balanceOf(
      this.signers.dave,
      tokenDave.publicKey,
      tokenDave.signature,
    );
    console.log(`daveBalanceEnd: `, instance.dave.decrypt(eerc20Address, daveBalanceEnd));

    // check if the carol has the activity right (nft token)
    const activityRightCarol = await activityNFT.connect(this.signers.carol).ownerOf(1);

    expect(activityRightCarol).to.equal(this.signers.carol.address);

  });
});
