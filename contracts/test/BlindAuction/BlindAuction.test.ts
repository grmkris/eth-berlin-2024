import { expect } from "chai";



import { BlindAuction } from "../../types";
import { deployBlindAuctionFixture, deployEncryptedERC20Fixture } from "../fixtures";
import { getSigners, initSigners } from "../signers";


describe.only("BlindAuction", function () {
  before(async function () {
    await initSigners();
    this.signers = await getSigners();
  });

  beforeEach(async function () {
    const encryptedERC20 = await deployEncryptedERC20Fixture({
      deployer: this.signers.alice,
    });
    const blindAuction = await deployBlindAuctionFixture({
      beneficiary: this.signers.bob.address,
      erc20Contract: await encryptedERC20.getAddress(),
      biddingTime: 100,
      deployer: this.signers.alice,
    });
    this.erc20Address = await encryptedERC20.getAddress();
    this.erc20 = encryptedERC20;
    this.blindAuction = blindAuction as BlindAuction;
    this.blindAuctionAddress = await blindAuction.getAddress();
  });

  it("should read endTime,beneficiary,bidCounter,tokenContract,tokenTransferred,stoppable,manuallyStopped,contractOwner", async function () {
    const endTime = await this.blindAuction.endTime();
    const beneficiary = await this.blindAuction.beneficiary();
    const bidCounter = await this.blindAuction.bidCounter();
    const tokenContract = await this.blindAuction.tokenContract();
    const tokenTransferred = await this.blindAuction.tokenTransferred();
    const stoppable = await this.blindAuction.stoppable();
    const manuallyStopped = await this.blindAuction.manuallyStopped();
    const contractOwner = await this.blindAuction.contractOwner();

    // skipping because we would need to get deploy timestamp and then increase it by 100 expect(endTime).to.be("TODO")
    expect(beneficiary).to.equal(this.signers.bob.address);
    expect(bidCounter).to.equal(0);
    expect(tokenContract).to.equal(this.erc20Address);
    expect(tokenTransferred).to.equal(false);
    expect(stoppable).to.equal(true);
    expect(manuallyStopped).to.equal(false);
    expect(contractOwner).to.equal(this.signers.alice.address);
  });
});
