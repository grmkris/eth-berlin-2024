import { ActivityNFTFactory } from "../../types";
import { deployActivityNftFactoryFixture } from "../fixtures";
import { getSigners, initSigners } from "../signers";
import {expect} from "chai";
import {isAddress} from "ethers";

describe.only("ActivityNFTFactory", function () {
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

  it.only("should create a new ActivityNFT contract", async function () {
    const activityRight = "Sleep in Fhain for 2 weeks";

    // create event listener
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await activityNFTFactory.on("ActivityNFTCreated", (activityNFTAddress) => {
      console.log("ActivityNFT created at address: ", activityNFTAddress);
    });
    // Call the createActivityNFT function
    const result = await activityNFTFactory.createActivityNFT(activityRight);
    await result.wait()

    const filter = activityNFTFactory.filters["ActivityNFTCreated(address)"]
    const events = await activityNFTFactory.queryFilter(filter)
    const event = events[0]
    expect(event.fragment.name).to.equal('ActivityNFTCreated')
    const args = event.args
    expect(isAddress(args[0])).to.be.true

  });
});
