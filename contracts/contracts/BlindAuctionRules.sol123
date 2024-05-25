// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "./identity/IdentityRegistry.sol";

interface IBlindAuction {
    function getIdentifier(address wallet, string calldata identifier) external view returns (euint64);
}

contract BlindAuctionRules {
    string[] public identifiers;

    mapping(address => uint64) public whitelistedWallets;
    mapping(string => uint8) public countries;
    uint16[] public country2CountryRestrictions;

    uint16[] public country2CountryRestrictions;

    constructor() {
        identifiers = ["country"];
        whitelistedWallets[address(0x133725C6461120439E85887C7639316CB27a2D9d)] = 1;
        whitelistedWallets[address(0x4CaCeF78615AFecEf7eF182CfbD243195Fc90a29)] = 2;

        countries["fr"] = 1;
        countries["de"] = 2;

        country2CountryRestrictions = [createRestriction(countries["us"], countries["fr"])];
    }

    function createRestriction(uint16 from, uint16 to) internal pure returns (uint16) {
        return (from << 8) + to;
    }

    function getIdentifiers() public view returns (string[] memory) {
        return identifiers;
    }

    function getC2CRestrictions() public view returns (uint16[] memory) {
        return country2CountryRestrictions;
    }

    function canBid(address from) public view returns (bool) {
        IBlindAuction erc20 = IBlindAuction(msg.sender);

        // Condition 3: Check country to country rules
        ebool c2cOK = checkCountry(from);
        return TFHE.asEbool(c2cOK);
    }

    function checkCountry(address from) internal view returns (ebool) {
        // Disallow transfer from country 2 to country 1
        uint16[] memory c2cRestrictions = getC2CRestrictions();

        euint64 fromCountry = from.getIdentifier(from, "country");
        euint64 toCountry = 2;
        require(TFHE.isInitialized(fromCountry) && TFHE.isInitialized(toCountry), "You don't have access");
        euint16 countryToCountry = TFHE.shl(TFHE.asEuint16(fromCountry), 8) + TFHE.asEuint16(toCountry);
        ebool condition = TFHE.asEbool(true);

        // Check all countryToCountry restrictions
        for (uint i = 0; i < c2cRestrictions.length; i++) {
            condition = TFHE.and(condition, TFHE.ne(countryToCountry, c2cRestrictions[i]));
        }

        return condition;
    }
}
