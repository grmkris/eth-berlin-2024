import { ethers } from 'ethers';
import ActivityNFTFactoryABI from '../abis/ActivityNFTFactory.json';
import EncryptedERC20ABI from '../abis/EncryptedERC20.json';
import { useState } from 'react';

const activityNFTFactoryAddress = "0xF7eE09CE742962b0c5542C5cbE3aBf76D9e0831c";
const eerc20Address = "0xaA19c1C539B6bc0D491Ee02E8A55eF2E486CebAe";

function useCreateAuctionHook(activityRight: string) {
    const [activityRightState, setActivityRight] = useState<string>("");
    const [log, setLog] = useState<string>("");

    // Initialize ethers with a provider (MetaMask in this case)
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    
    // Create a signer
    const signer = provider.getSigner();

    async function createActivityNFT() {
        if (!activityRight) {
            alert("Please enter an activity right.");
            return;
        }

        // Connect to the ActivityNFTFactory contract
        const activityNFTFactory = new ethers.Contract(activityNFTFactoryAddress, ActivityNFTFactoryABI.abi, signer);
        const eerc20 = new ethers.Contract(eerc20Address, EncryptedERC20ABI.abi, signer);

        try {
            // Replace this with your token minting logic if necessary,
            // for now, we assume the signer has the required tokens
            const createTx = await activityNFTFactory.createActivityNFT(activityRight, eerc20.address, 1000000, signer, 100);
            const receipt = await createTx.wait();
            console.log(receipt)

            setLog(`ActivityNFT created. Transaction Hash: ${receipt.transactionHash}`);
            return receipt; // Return the transaction receipt

        } catch (error) {
            console.error("Failed to create ActivityNFT", error);
            setLog(`Failed to create ActivityNFT: ${(error as Error).message}`);
        }


    }
}

export default useCreateAuctionHook;