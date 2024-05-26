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
  userAddress: string,
  instance: FhevmInstance
) => {
  if (instance.hasKeypair(contractAddress)) {
    return instance.getPublicKey(contractAddress)!;
  } else {
    const { publicKey, eip712 } = instance.generatePublicKey({
      verifyingContract: contractAddress,
    });
    const params = [userAddress, JSON.stringify(eip712)];
    const signature: string = await (window as any).ethereum.request({
      method: "eth_signTypedData_v4",
      params,
    });
    instance.setSignature(contractAddress, signature);
    return { signature, publicKey };
  }
};

export const getInstance = () => {
  return instance;
};

export const getInstanceDynamically = async (props: {
  contractAddress: string;
  signer: Signer;
}) => {
  await initFhevm();
  const provider = new BrowserProvider((window as any).ethereum);
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();
  console.log("chainId", {
    chainId,
  network,
    provider
  });
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
    data: "0xd9d47bb001",
  });
  console.log("ret", ret);
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  const dynamicinstance = await createInstance({ chainId, publicKey });

  const address = await props?.signer.getAddress();
  if (!address) {
    throw new Error("Signer address not found");
  }
  await getSignature(
    props?.contractAddress,
      address,
      dynamicinstance
    );
  return dynamicinstance;
}
