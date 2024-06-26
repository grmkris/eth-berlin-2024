/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface BlindAuctionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "activityNFT"
      | "auctionEnd"
      | "beneficiary"
      | "bid"
      | "bidCounter"
      | "claim"
      | "contractOwner"
      | "doIHaveHighestBid"
      | "eip712Domain"
      | "endTime"
      | "feePercentageBp"
      | "feeRecipient"
      | "getBid"
      | "manuallyStopped"
      | "stop"
      | "stoppable"
      | "tokenContract"
      | "tokenTransferred"
      | "withdraw"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;

  encodeFunctionData(
    functionFragment: "activityNFT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "auctionEnd",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "beneficiary",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "bid", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "bidCounter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "contractOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "doIHaveHighestBid",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "endTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feePercentageBp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBid",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "manuallyStopped",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "stop", values?: undefined): string;
  encodeFunctionData(functionFragment: "stoppable", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenTransferred",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "activityNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "auctionEnd", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "beneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bidCounter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contractOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "doIHaveHighestBid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "endTime", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feePercentageBp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "manuallyStopped",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stop", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stoppable", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenTransferred",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BlindAuction extends BaseContract {
  connect(runner?: ContractRunner | null): BlindAuction;
  waitForDeployment(): Promise<this>;

  interface: BlindAuctionInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  activityNFT: TypedContractMethod<[], [string], "view">;

  auctionEnd: TypedContractMethod<[], [void], "nonpayable">;

  beneficiary: TypedContractMethod<[], [string], "view">;

  bid: TypedContractMethod<[encryptedValue: BytesLike], [void], "nonpayable">;

  bidCounter: TypedContractMethod<[], [bigint], "view">;

  claim: TypedContractMethod<[], [void], "nonpayable">;

  contractOwner: TypedContractMethod<[], [string], "view">;

  doIHaveHighestBid: TypedContractMethod<
    [publicKey: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  endTime: TypedContractMethod<[], [bigint], "view">;

  feePercentageBp: TypedContractMethod<[], [bigint], "view">;

  feeRecipient: TypedContractMethod<[], [string], "view">;

  getBid: TypedContractMethod<
    [publicKey: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;

  manuallyStopped: TypedContractMethod<[], [boolean], "view">;

  stop: TypedContractMethod<[], [void], "nonpayable">;

  stoppable: TypedContractMethod<[], [boolean], "view">;

  tokenContract: TypedContractMethod<[], [string], "view">;

  tokenTransferred: TypedContractMethod<[], [boolean], "view">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "activityNFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "auctionEnd"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "beneficiary"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "bid"
  ): TypedContractMethod<[encryptedValue: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "bidCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "contractOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "doIHaveHighestBid"
  ): TypedContractMethod<
    [publicKey: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "endTime"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feePercentageBp"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feeRecipient"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getBid"
  ): TypedContractMethod<
    [publicKey: BytesLike, signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "manuallyStopped"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "stop"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "stoppable"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "tokenContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenTransferred"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;

  filters: {
    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
  };
}
