// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ActivityNFT is ERC721 {
    uint256 private _tokenIds;
    // Associates the activity right with the unique token ID
    mapping(uint256 => string) private _activityRights;

    event ActivityRightCreated(uint256 tokenId, string activityRight);

    constructor(address owner, string memory activityRight) ERC721("ActivityNFT", "ACT") {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(owner, newTokenId);  // Mint the token to the specified owner
        _activityRights[newTokenId] = activityRight;

        emit ActivityRightCreated(newTokenId, activityRight);
    }

    function getActivityRight(uint256 tokenId) public view returns (string memory) {
        return _activityRights[tokenId];
    }
}

contract ActivityNFTFactory {
    event ActivityNFTCreated(address activityNFTAddress);

    function createActivityNFT(string memory activityRight) public returns (address) {
        ActivityNFT activityNFT = new ActivityNFT(msg.sender, activityRight);
        emit ActivityNFTCreated(address(activityNFT));
        return address(activityNFT);
    }
}
