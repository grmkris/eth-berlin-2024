import { ethers } from "hardhat";

import type { BlindAuction, EncryptedERC20 } from "../types";
import { getSigners } from "./signers";
import {ContractRunner} from "ethers";

export async function deployEncryptedERC20Fixture(props: {
  deployer: ContractRunner;
}): Promise<EncryptedERC20> {

  const contractFactory = await ethers.getContractFactory("EncryptedERC20");
  const contract = await contractFactory.connect(props.deployer).deploy("EncryptedERC20", "ENC");
  await contract.waitForDeployment();
  return contract as EncryptedERC20;
}

export async function deployBlindAuctionFixture(props: {
  beneficiary: string;
  erc20Contract: string;
  biddingTime: number;
  deployer: ContractRunner;
}): Promise<BlindAuction> {

  const contractFactory = await ethers.getContractFactory("BlindAuction");
  const contract = await contractFactory.connect(props.deployer).deploy(props.beneficiary, props.erc20Contract, props.biddingTime, true);
  await contract.waitForDeployment();
  return contract as BlindAuction;
}
