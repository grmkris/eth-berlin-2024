import { ethers } from "hardhat";

import type {BlindAuction, CompliantERC20, EncryptedERC20, ERC20Rules, IdentityRegistry} from "../types";
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
  feeRecipient: string;
  feePercentage: number;
}): Promise<BlindAuction> {

  const contractFactory = await ethers.getContractFactory("BlindAuction");
  const contract = await contractFactory.connect(props.deployer).deploy(props.beneficiary, props.erc20Contract, props.biddingTime, true,
    props.feeRecipient, props.feePercentage
  );
  await contract.waitForDeployment();
  return contract as BlindAuction;
}

export async function deployCompliantERC20Fixture(
  identityAddress: string,
  erc20RulesAddress: string,
): Promise<CompliantERC20> {
  const signers = await getSigners();

  const contractFactory = await ethers.getContractFactory('CompliantERC20');
  const contract = await contractFactory
    .connect(signers.alice)
    .deploy(identityAddress, erc20RulesAddress, 'CompliantToken', 'CTOK');
  await contract.waitForDeployment();

  return contract;
}

export async function deployERC20RulesFixture(): Promise<ERC20Rules> {
  const signers = await getSigners();

  const contractFactory = await ethers.getContractFactory('ERC20Rules');
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  return contract;
}


export async function deployIdentityRegistryFixture(): Promise<IdentityRegistry> {
  const signers = await getSigners();
  const contractFactory = await ethers.getContractFactory('IdentityRegistry');
  const contract = await contractFactory.connect(signers.alice).deploy();
  await contract.waitForDeployment();

  return contract;
}
