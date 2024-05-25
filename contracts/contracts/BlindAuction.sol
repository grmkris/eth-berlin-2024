// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "fhevm/abstracts/Reencrypt.sol";

import "./EncryptedERC20.sol";

contract BlindAuction is Reencrypt {
    uint public endTime;

    address public beneficiary;

    // Current highest bid.
    euint64 internal highestBid;

    // Mapping from bidder to their bid value.
    mapping(address => euint64) private bids;

    // Number of bid
    uint public bidCounter;

    // The token contract used for encrypted bids.
    EncryptedERC20 public tokenContract;

    // Whether the auction object has been claimed.
    ebool private objectClaimed;

    // If the token has been transferred to the beneficiary
    bool public tokenTransferred;

    bool public stoppable;

    bool public manuallyStopped = false;

    // The owner of the contract.
    address public contractOwner;

    // The function has been called too early.
    // Try again at `time`.
    error TooEarly(uint time);
    // The function has been called too late.
    // It cannot be called after `time`.
    error TooLate(uint time);

    // The address that will receive the protocol fees.
    address public feeRecipient;

    // The fee percentage in basis points (e.g., 100 = 1%).
    euint64 public feePercentageBp;

    constructor(address _beneficiary, EncryptedERC20 _tokenContract, uint biddingTime, bool isStoppable, address _feeRecipient, uint16 _feePercentageBp) {
        beneficiary = _beneficiary;
        tokenContract = _tokenContract;
        endTime = block.timestamp + biddingTime;
        objectClaimed = TFHE.asEbool(false);
        tokenTransferred = false;
        bidCounter = 0;
        stoppable = isStoppable;
        contractOwner = msg.sender;
        feeRecipient = _feeRecipient;
        feePercentageBp = TFHE.asEuint64(_feePercentageBp);
    }

    // Bid an `encryptedValue`.
    function bid(bytes calldata encryptedValue) public onlyBeforeEnd {
        euint64 value = TFHE.asEuint64(encryptedValue);
        euint64 existingBid = bids[msg.sender];
        if (TFHE.isInitialized(existingBid)) {
            euint64 balanceBefore = tokenContract.balanceOfMe();
            ebool isHigher = TFHE.lt(existingBid, value);
            euint64 toTransfer = value - existingBid;
            // Transfer only if bid is higher, also to avoid overflow from previous line
            euint64 amount = TFHE.select(isHigher, toTransfer, TFHE.asEuint64(0));
            tokenContract.transferFrom(msg.sender, address(this), amount);

            euint64 balanceAfter = tokenContract.balanceOfMe();
            euint64 sentBalance = balanceAfter - balanceBefore;
            euint64 newBid = existingBid + sentBalance;
            // Update bid with value
            bids[msg.sender] = newBid;
        } else {
            bidCounter++;
            euint64 balanceBefore = tokenContract.balanceOfMe();
            tokenContract.transferFrom(msg.sender, address(this), value);
            euint64 balanceAfter = tokenContract.balanceOfMe();
            euint64 sentBalance = balanceAfter - balanceBefore;
            bids[msg.sender] = sentBalance;
        }
        euint64 currentBid = bids[msg.sender];
        if (!TFHE.isInitialized(highestBid)) {
            highestBid = currentBid;
        } else {
            highestBid = TFHE.select(TFHE.lt(highestBid, currentBid), currentBid, highestBid);
        }
    }

    function getBid(
        bytes32 publicKey,
        bytes calldata signature
    ) public view onlySignedPublicKey(publicKey, signature) returns (bytes memory) {
        return TFHE.reencrypt(bids[msg.sender], publicKey, 0);
    }

    // Returns the user bid
    function stop() public onlyContractOwner {
        require(stoppable);
        manuallyStopped = true;
    }

    // Returns an encrypted boolean under the caller's public key, indicating
    // if the caller has the highest bid.
    function doIHaveHighestBid(
        bytes32 publicKey,
        bytes calldata signature
    ) public view onlyAfterEnd onlySignedPublicKey(publicKey, signature) returns (bytes memory) {
        if (TFHE.isInitialized(highestBid) && TFHE.isInitialized(bids[msg.sender])) {
            return TFHE.reencrypt(TFHE.le(highestBid, bids[msg.sender]), publicKey);
        } else {
            return TFHE.reencrypt(TFHE.asEbool(false), publicKey);
        }
    }

    // Claim the object. Succeeds only if the caller has the highest bid.
    // WARNING : if there is a draw, only first highest bidder to claim will get the prize (an improved implementation could handle this case differently)
    function claim() public onlyAfterEnd {
        ebool canClaim = TFHE.and(TFHE.le(highestBid, bids[msg.sender]), TFHE.not(objectClaimed));

        objectClaimed = TFHE.or(canClaim, objectClaimed);
        bids[msg.sender] = TFHE.select(canClaim, TFHE.asEuint64(0), bids[msg.sender]);
    }

    // Transfer token to beneficiary and fees to feeRecipient
    function auctionEnd() public onlyAfterEnd {
        require(!tokenTransferred);
        tokenTransferred = true;

        // Calculate the fee
        euint64 bidBasispoints = TFHE.mul(highestBid, feePercentageBp);
        uint64 basisPointsDivisor = 10000;
        euint64 feeAmount = TFHE.div(bidBasispoints, basisPointsDivisor);

        // Transfer the fee to the feeRecipient
        tokenContract.transfer(feeRecipient, feeAmount);

        // Transfer the remaining amount to the beneficiary
        euint64 amountToBeneficiary = highestBid - feeAmount;
        tokenContract.transfer(beneficiary, amountToBeneficiary);
    }


    // Withdraw a bid from the auction to the caller once the auction has stopped.
    function withdraw() public onlyAfterEnd {
        euint64 bidValue = bids[msg.sender];
        ebool isHighestBid = TFHE.eq(bidValue, highestBid);
        ebool canWithdraw = TFHE.not(TFHE.and(isHighestBid, TFHE.not(objectClaimed)));
        tokenContract.transfer(msg.sender, TFHE.select(canWithdraw, bidValue, TFHE.asEuint64(0)));
        bids[msg.sender] = TFHE.select(canWithdraw, TFHE.asEuint64(0), bids[msg.sender]);
    }

    modifier onlyBeforeEnd() {
        if (block.timestamp >= endTime || manuallyStopped == true) revert TooLate(endTime);
        _;
    }

    modifier onlyAfterEnd() {
        if (block.timestamp <= endTime && manuallyStopped == false) revert TooEarly(endTime);
        _;
    }

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner);
        _;
    }
}
