import { expect } from "chai";
import { ethers } from "hardhat";
import { deployActivityNftFactoryFixture } from "../fixtures";
import { getSigners, initSigners } from "../signers";
import { ActivityNFTFactory } from "../../types";

describe("ActivityNFTFactory", function () {
    let activityNFTFactory: ActivityNFTFactory;
    before(async function () {
        await initSigners(3);
        this.signers = await getSigners();
    });

    beforeEach(async function () {
        const contract = await deployActivityNftFactoryFixture();
        this.contractAddress = await contract.getAddress();
        activityNFTFactory = contract as ActivityNFTFactory;
    });

  it("should create a new ActivityNFT contract", async function () {
    const activityRight = "Sleep in Fhain for 2 weeks";

    // Call the createActivityNFT function
    const result = await activityNFTFactory.createActivityNFT(activityRight);
    //TODO: check for emitted events

  });
});