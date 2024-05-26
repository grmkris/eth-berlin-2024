/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  EncryptedERC20,
  EncryptedERC20Interface,
} from "../../contracts/EncryptedERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "publicKey",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "encryptedAmount",
        type: "bytes",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "euint64",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "publicKey",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "balanceOfMe",
    outputs: [
      {
        internalType: "euint64",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "mintedAmount",
        type: "uint64",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "encryptedAmount",
        type: "bytes",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "euint64",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "euint64",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "encryptedAmount",
        type: "bytes",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61016060405234801562000011575f80fd5b506040516200204838038062002048833981016040819052620000349162000345565b604080518082018252601381527f417574686f72697a6174696f6e20746f6b656e00000000000000000000000000602080830191909152825180840190935260018352603160f81b9083015233916200008e825f62000196565b610120526200009f81600162000196565b61014052815160208084019190912060e052815190820120610100524660a0526200012c60e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a08201525f9060c00160405160208183030381529060405280519060200120905090565b60805250503060c0526001600160a01b0381166200016457604051631e4fbdf760e01b81525f60048201526024015b60405180910390fd5b6200016f81620001ce565b5060046200017e838262000435565b5060056200018d828262000435565b50505062000559565b5f602083511015620001b557620001ad83620001ec565b9050620001c8565b81620001c2848262000435565b5060ff90505b92915050565b600380546001600160a01b0319169055620001e9816200022e565b50565b5f80829050601f8151111562000219578260405163305a27a960e01b81526004016200015b919062000501565b8051620002268262000535565b179392505050565b600280546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b634e487b7160e01b5f52604160045260245ffd5b5f5b83811015620002af57818101518382015260200162000295565b50505f910152565b5f82601f830112620002c7575f80fd5b81516001600160401b0380821115620002e457620002e46200027f565b604051601f8301601f19908116603f011681019082821181831017156200030f576200030f6200027f565b8160405283815286602085880101111562000328575f80fd5b6200033b84602083016020890162000293565b9695505050505050565b5f806040838503121562000357575f80fd5b82516001600160401b03808211156200036e575f80fd5b6200037c86838701620002b7565b9350602085015191508082111562000392575f80fd5b50620003a185828601620002b7565b9150509250929050565b600181811c90821680620003c057607f821691505b602082108103620003df57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200043057805f5260205f20601f840160051c810160208510156200040c5750805b601f840160051c820191505b818110156200042d575f815560010162000418565b50505b505050565b81516001600160401b038111156200045157620004516200027f565b6200046981620004628454620003ab565b84620003e5565b602080601f8311600181146200049f575f8415620004875750858301515b5f19600386901b1c1916600185901b178555620004f9565b5f85815260208120601f198616915b82811015620004cf57888601518255948401946001909101908401620004ae565b5085821015620004ed57878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b602081525f82518060208401526200052181604085016020870162000293565b601f01601f19169190910160400192915050565b80516020808301519190811015620003df575f1960209190910360031b1b16919050565b60805160a05160c05160e051610100516101205161014051611a9d620005ab5f395f610d4101525f610d1001525f610f5601525f610f2e01525f610e8901525f610eb301525f610edd0152611a9d5ff3fe608060405234801561000f575f80fd5b5060043610610163575f3560e01c80636934c747116100c757806395d89b411161007d578063e30c397811610063578063e30c3978146102e6578063f2fde38b146102f7578063fb9d09c81461030a575f80fd5b806395d89b41146102cb578063a9059cbb146102d3575f80fd5b806379ba5097116100ad57806379ba50971461028357806384b0196e1461028b5780638da5cb5b146102a6575f80fd5b80636934c74714610266578063715018a614610279575f80fd5b806323b872dd1161011c578063313ce56711610102578063313ce5671461022757806332cbfb07146102405780634997266314610253575f80fd5b806323b872dd146102015780632972351114610214575f80fd5b8063095ea7b31161014c578063095ea7b3146101a45780630eb2b9c9146101b757806318160ddd146101d4575f80fd5b8063014647f41461016757806306fdde031461018f575b5f80fd5b61017a61017536600461162f565b61031d565b60405190151581526020015b60405180910390f35b61019761036d565b60405161018691906116cb565b61017a6101b23660046116dd565b6103fd565b335f90815260066020526040902054604051908152602001610186565b600354600160a01b900467ffffffffffffffff1660405167ffffffffffffffff9091168152602001610186565b61017a61020f366004611705565b61045a565b61017a61022236600461162f565b610482565b61022e5f81565b60405160ff9091168152602001610186565b61019761024e36600461173e565b6104c5565b61017a6102613660046117a8565b61062c565b610197610274366004611805565b610670565b6102816107cf565b005b6102816107e2565b610293610826565b6040516101869796959493929190611843565b6002546001600160a01b03165b6040516001600160a01b039091168152602001610186565b610197610868565b61017a6102e13660046116dd565b610877565b6003546001600160a01b03166102b3565b6102816103053660046118da565b6108ab565b6102816103183660046118f3565b610929565b5f610360846101b285858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250610a3e92505050565b50600190505b9392505050565b60606004805461037c9061191a565b80601f01602080910402602001604051908101604052809291908181526020018280546103a89061191a565b80156103f35780601f106103ca576101008083540402835291602001916103f3565b820191905f5260205f20905b8154815290600101906020018083116103d657829003601f168201915b5050505050905090565b335f8181526007602090815260408083206001600160a01b03871680855292528083208590555191929182907ff37f546c25e850257cc0c94f92bec94a17e2f0e884ddda268a25d8144b70eb6a908590a360019150505b92915050565b5f3381610468868386610a4a565b905061047686868684610ae8565b50600195945050505050565b5f610360846102e185858080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250610a3e92505050565b60608383838080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920182905250604080517f051d137ae0e1fae6e3b6559fed4442b35a85a9a39789838ad5c9ea05e7da2dce6020820152908101879052909350610552925060600190505b60405160208183030381529060405280519060200120610bae565b90505f61055f8284610bda565b90506001600160a01b03811633146105e45760405162461bcd60e51b815260206004820152603160248201527f454950373132207369676e657220616e64207472616e73616374696f6e20736960448201527f676e657220646f206e6f74206d6174636800000000000000000000000000000060648201526084015b60405180910390fd5b6001600160a01b038a1633148061060357506001600160a01b03891633145b61060b575f80fd5b61061e6106188b8b610c02565b89610c69565b9a9950505050505050505050565b5f610476858561020f86868080601f0160208091040260200160405190810160405280939291908181526020018383808284375f92019190915250610a3e92505050565b60608383838080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920182905250604080517f051d137ae0e1fae6e3b6559fed4442b35a85a9a39789838ad5c9ea05e7da2dce60208201529081018790529093506106e692506060019050610537565b90505f6106f38284610bda565b90506001600160a01b03811633146107735760405162461bcd60e51b815260206004820152603160248201527f454950373132207369676e657220616e64207472616e73616374696f6e20736960448201527f676e657220646f206e6f74206d6174636800000000000000000000000000000060648201526084016105db565b336001600160a01b038a16036107ad576001600160a01b0389165f908152600660205260408120546107a6918a90610c75565b94506107c3565b6107c06107b95f610caa565b895f610c75565b94505b50505050949350505050565b6107d7610cb6565b6107e05f610ce3565b565b60035433906001600160a01b0316811461081a5760405163118cdaa760e01b81526001600160a01b03821660048201526024016105db565b61082381610ce3565b50565b5f6060805f805f6060610837610d09565b61083f610d3a565b604080515f80825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606005805461037c9061191a565b335f908152600660205260408120548190610893908490610d67565b90506108a133858584610ae8565b5060019392505050565b6108b3610cb6565b600380546001600160a01b03831673ffffffffffffffffffffffffffffffffffffffff1990911681179091556108f16002546001600160a01b031690565b6001600160a01b03167f38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e2270060405160405180910390a350565b610931610cb6565b61096f60065f6109496002546001600160a01b031690565b6001600160a01b03166001600160a01b031681526020019081526020015f205482610d95565b60065f6109846002546001600160a01b031690565b6001600160a01b0316815260208101919091526040015f20556003546109bc908290600160a01b900467ffffffffffffffff16611966565b600380547fffffffff0000000000000000ffffffffffffffffffffffffffffffffffffffff16600160a01b67ffffffffffffffff93841602179055600254604080519284168352516001600160a01b03909116917f9109de113672aaca72ede8bc906f7aafabee865311ac020fb15c71edf94a0a01919081900360200190a250565b5f610454826005610dbd565b5f80610a568585610c02565b90505f610a638483610d67565b6001600160a01b0387165f9081526006602052604081205491925090610a8a908690610d67565b90505f610a978284610e50565b9050610add8888610ab284610aac898c610e5b565b89610e66565b6001600160a01b039283165f9081526007602090815260408083209490951682529290925291902055565b979650505050505050565b6001600160a01b0383165f90815260066020526040812054610b1f91610b1a9084908690610b1590610caa565b610e66565b610e72565b6001600160a01b038085165f9081526006602052604080822093909355908616815290812054610b5f91610b5a9084908690610b1590610caa565b610e5b565b6001600160a01b038086165f818152600660205260408082209490945592519186169290917f4853ae1b4d437c4255ac16cd3ceda3465975023f27cb141584cd9d44440fed829190a350505050565b5f610454610bba610e7d565b8360405161190160f01b8152600281019290925260228201526042902090565b5f805f80610be88686610fa6565b925092509250610bf88282610fef565b5090949350505050565b6001600160a01b038281165f90815260076020908152604080832093851683529290529081205415610c5957506001600160a01b038083165f90815260076020908152604080832093851683529290522054610454565b610c625f610caa565b9050610454565b606061036683836110ab565b60608315610c8e57610c8784846110ab565b9050610366565b610c87610ca48367ffffffffffffffff16610caa565b846110ab565b5f610454826005611116565b6002546001600160a01b031633146107e05760405163118cdaa760e01b81523360048201526024016105db565b6003805473ffffffffffffffffffffffffffffffffffffffff191690556108238161118b565b6060610d357f00000000000000000000000000000000000000000000000000000000000000005f6111e9565b905090565b6060610d357f000000000000000000000000000000000000000000000000000000000000000060016111e9565b5f82610d7957610d765f610caa565b92505b81610d8a57610d875f610caa565b91505b61036683835f61128b565b5f82610da757610da45f610caa565b92505b610366838367ffffffffffffffff166001611321565b5f80838360f81b604051602001610dd592919061199a565b60408051601f1981840301815290829052630964a5d960e31b82529150605d90634b252ec890610e099084906004016116cb565b602060405180830381865afa158015610e24573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610e4891906119c8565b949350505050565b5f6103668383611373565b5f61036683836113aa565b5f610e488484846113d8565b5f6103668383611423565b5f306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610ed557507f000000000000000000000000000000000000000000000000000000000000000046145b15610eff57507f000000000000000000000000000000000000000000000000000000000000000090565b610d35604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a08201525f9060c00160405160208183030381529060405280519060200120905090565b5f805f8351604103610fdd576020840151604085015160608601515f1a610fcf88828585611451565b955095509550505050610fe8565b505081515f91506002905b9250925092565b5f826003811115611002576110026119df565b0361100b575050565b600182600381111561101f5761101f6119df565b0361103d5760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115611051576110516119df565b036110725760405163fce698f760e01b8152600481018290526024016105db565b6003826003811115611086576110866119df565b036110a7576040516335e2f38360e21b8152600481018290526024016105db565b5050565b60405163d6ad57cd60e01b81526004810183905260248101829052606090605d9063d6ad57cd906044015f60405180830381865afa1580156110ef573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f1916820160405261036691908101906119f3565b604051631ce2e8d760e31b8152600481018390526001600160f81b031960f883901b1660248201525f90605d9063e71746b890604401602060405180830381865afa158015611167573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061036691906119c8565b600280546001600160a01b0383811673ffffffffffffffffffffffffffffffffffffffff19831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b606060ff83146111fc57610c6283611519565b8180546112089061191a565b80601f01602080910402602001604051908101604052809291908181526020018280546112349061191a565b801561127f5780601f106112565761010080835404028352916020019161127f565b820191905f5260205f20905b81548152906001019060200180831161126257829003601f168201915b50505050509050610454565b5f80821561129e5750600160f81b6112a1565b505f5b6040516334a6d7b960e11b815260048101869052602481018590526001600160f81b031982166044820152605d9063694daf72906064015b602060405180830381865afa1580156112f4573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061131891906119c8565b95945050505050565b5f8082156113345750600160f81b611337565b505f5b60405163f953e42760e01b815260048101869052602481018590526001600160f81b031982166044820152605d9063f953e427906064016112d9565b604051630ccd46b160e31b815260048101839052602481018290525f60448201819052908190605d9063666a358890606401610e09565b5f826113bc576113b95f610caa565b92505b816113cd576113ca5f610caa565b91505b61036683835f611556565b60405163cb3b940760e01b81526004810184905260248101839052604481018290525f90605d9063cb3b940790606401602060405180830381865afa158015610e24573d5f803e3d5ffd5b5f82611435576114325f610caa565b92505b81611446576114435f610caa565b91505b61036683835f611321565b5f80807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a084111561148a57505f9150600390508261150f565b604080515f808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa1580156114db573d5f803e3d5ffd5b5050604051601f1901519150506001600160a01b03811661150657505f92506001915082905061150f565b92505f91508190505b9450945094915050565b60605f611525836115a8565b6040805160208082528183019092529192505f91906020820181803683375050509182525060208101929092525090565b5f8082156115695750600160f81b61156c565b505f5b604051638c14cc2160e01b815260048101869052602481018590526001600160f81b031982166044820152605d90638c14cc21906064016112d9565b5f60ff8216601f81111561045457604051632cd44ac360e21b815260040160405180910390fd5b80356001600160a01b03811681146115e5575f80fd5b919050565b5f8083601f8401126115fa575f80fd5b50813567ffffffffffffffff811115611611575f80fd5b602083019150836020828501011115611628575f80fd5b9250929050565b5f805f60408486031215611641575f80fd5b61164a846115cf565b9250602084013567ffffffffffffffff811115611665575f80fd5b611671868287016115ea565b9497909650939450505050565b5f5b83811015611698578181015183820152602001611680565b50505f910152565b5f81518084526116b781602086016020860161167e565b601f01601f19169290920160200192915050565b602081525f61036660208301846116a0565b5f80604083850312156116ee575f80fd5b6116f7836115cf565b946020939093013593505050565b5f805f60608486031215611717575f80fd5b611720846115cf565b925061172e602085016115cf565b9150604084013590509250925092565b5f805f805f60808688031215611752575f80fd5b61175b866115cf565b9450611769602087016115cf565b935060408601359250606086013567ffffffffffffffff81111561178b575f80fd5b611797888289016115ea565b969995985093965092949392505050565b5f805f80606085870312156117bb575f80fd5b6117c4856115cf565b93506117d2602086016115cf565b9250604085013567ffffffffffffffff8111156117ed575f80fd5b6117f9878288016115ea565b95989497509550505050565b5f805f8060608587031215611818575f80fd5b611821856115cf565b935060208501359250604085013567ffffffffffffffff8111156117ed575f80fd5b60ff60f81b881681525f602060e0602084015261186360e084018a6116a0565b8381036040850152611875818a6116a0565b606085018990526001600160a01b038816608086015260a0850187905284810360c0860152855180825260208088019350909101905f5b818110156118c8578351835292840192918401916001016118ac565b50909c9b505050505050505050505050565b5f602082840312156118ea575f80fd5b610366826115cf565b5f60208284031215611903575f80fd5b813567ffffffffffffffff81168114610366575f80fd5b600181811c9082168061192e57607f821691505b60208210810361194c57634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52604160045260245ffd5b67ffffffffffffffff81811683821601908082111561199357634e487b7160e01b5f52601160045260245ffd5b5092915050565b5f83516119ab81846020880161167e565b6001600160f81b0319939093169190920190815260010192915050565b5f602082840312156119d8575f80fd5b5051919050565b634e487b7160e01b5f52602160045260245ffd5b5f60208284031215611a03575f80fd5b815167ffffffffffffffff80821115611a1a575f80fd5b818401915084601f830112611a2d575f80fd5b815181811115611a3f57611a3f611952565b604051601f8201601f19908116603f01168101908382118183101715611a6757611a67611952565b81604052828152876020848701011115611a7f575f80fd5b610add83602083016020880161167e56fea164736f6c6343000816000a";

type EncryptedERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EncryptedERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EncryptedERC20__factory extends ContractFactory {
  constructor(...args: EncryptedERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      EncryptedERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): EncryptedERC20__factory {
    return super.connect(runner) as EncryptedERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EncryptedERC20Interface {
    return new Interface(_abi) as EncryptedERC20Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): EncryptedERC20 {
    return new Contract(address, _abi, runner) as unknown as EncryptedERC20;
  }
}
