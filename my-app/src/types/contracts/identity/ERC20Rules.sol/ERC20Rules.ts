/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface ERC20RulesInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "countries"
      | "country2CountryRestrictions"
      | "getC2CRestrictions"
      | "getIdentifiers"
      | "identifiers"
      | "transfer"
      | "whitelistedWallets"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "countries", values: [string]): string;
  encodeFunctionData(
    functionFragment: "country2CountryRestrictions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getC2CRestrictions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIdentifiers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "identifiers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelistedWallets",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "countries", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "country2CountryRestrictions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getC2CRestrictions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIdentifiers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "identifiers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "whitelistedWallets",
    data: BytesLike
  ): Result;
}

export interface ERC20Rules extends BaseContract {
  connect(runner?: ContractRunner | null): ERC20Rules;
  waitForDeployment(): Promise<this>;

  interface: ERC20RulesInterface;

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

  countries: TypedContractMethod<[arg0: string], [bigint], "view">;

  country2CountryRestrictions: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  getC2CRestrictions: TypedContractMethod<[], [bigint[]], "view">;

  getIdentifiers: TypedContractMethod<[], [string[]], "view">;

  identifiers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  transfer: TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [bigint],
    "view"
  >;

  whitelistedWallets: TypedContractMethod<
    [arg0: AddressLike],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "countries"
  ): TypedContractMethod<[arg0: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "country2CountryRestrictions"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getC2CRestrictions"
  ): TypedContractMethod<[], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "getIdentifiers"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "identifiers"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [from: AddressLike, to: AddressLike, amount: BigNumberish],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "whitelistedWallets"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  filters: {};
}