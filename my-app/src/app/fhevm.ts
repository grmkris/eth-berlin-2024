// Sauce: https://github.com/zama-ai/fhevmjs-next-template/blob/main/app/fhevmjs.ts
import {BrowserProvider, AbiCoder, Signer} from "ethers";
import { initFhevm, createInstance, FhevmInstance } from "fhevmjs";

const FHE_LIB_ADDRESS = "0x000000000000000000000000000000000000005d";

let instance: FhevmInstance;

export const createFhevmInstance = async () => {
  const provider = new BrowserProvider((window as any).ethereum);
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  instance = await createInstance({ chainId, publicKey });
};

export const getSignature = async (
  contractAddress: string,
  userAddress: string
) => {
  if (getInstance().hasKeypair(contractAddress)) {
    return getInstance().getPublicKey(contractAddress)!;
  } else {
    const { publicKey, eip712 } = getInstance().generatePublicKey({
      verifyingContract: contractAddress,
    });
    const params = [userAddress, JSON.stringify(eip712)];
    const signature: string = await (window as any).ethereum.request({
      method: "eth_signTypedData_v4",
      params,
    });
    getInstance().setSignature(contractAddress, signature);
    return { signature, publicKey };
  }
};

export const getInstance = () => {
  return instance;
};

export const getInstanceDynamically = async (props?: {
}) => {
  await initFhevm();
  const provider = new BrowserProvider((window as any).ethereum);
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  console.log("chainId", {
    chainId,
  network,
  });
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  console.log("ret", ret);
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  console.log("publicKey", publicKey);
  const dynamicinstance = await createInstance({ chainId, publicKey });
  return dynamicinstance;
}
