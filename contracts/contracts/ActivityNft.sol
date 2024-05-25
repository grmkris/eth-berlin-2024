// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./BlindAuction.sol";

contract ActivityNFT is ERC721 {
    // Associates the activity right with the unique token ID
    mapping(uint256 => string) private _activityRights;

    event ActivityRightCreated(uint256 tokenId, string activityRight);

    constructor(address owner, string memory activityRight) ERC721("ActivityNFT", "ACT") {
        _mint(owner, 1);  // Mint the token to the specified owner
        _activityRights[1] = activityRight;

        emit ActivityRightCreated(1, activityRight);
    }

    function getActivityRight() public view returns (string memory) {
        return _activityRights[1];
    }
}

contract ActivityNFTFactory {
    event ActivityNFTCreated(address activityNFTAddress, address blindAuctionAddress);

    function createActivityNFT(string memory activityRight, address encryptedERC20Address, uint biddingTime, address feeRecipient, uint16 feePercentageBp) public returns (address) {
        ActivityNFT activityNFT = new ActivityNFT(address(this), activityRight);

        BlindAuction blindAuction = new BlindAuction(msg.sender, encryptedERC20Address, biddingTime,
            true, feeRecipient, feePercentageBp, address(activityNFT), msg.sender);

        // transfer activityNFT to the blindAuction contract
        activityNFT.transferFrom(address(this), address(blindAuction), 1);

        emit ActivityNFTCreated(address(activityNFT), address(blindAuction));
        return address(activityNFT);
    }
}
