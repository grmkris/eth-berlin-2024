
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { type Chain } from 'viem'


import { cookieStorage, createStorage } from 'wagmi'

export const zama = {
  id: 8009,
  name: 'Zama Network',
  nativeCurrency: { name: 'ZAMA', symbol: 'ZAMA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://devnet.zama.ai'] },
  },
  blockExplorers: {
    default: { name: 'ZAMA Explorer', url: 'https://main.explorer.zama.ai' },
  },
} as const satisfies Chain


// Your WalletConnect Cloud project ID
export const projectId = '978cfb655f7ff12bb7ea6cbefbe5f0da'

// Create a metadata object
const metadata = {
  name: 'Bet&Bed',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

// Create wagmiConfig
const chains = [sepolia, zama] as const

export const config = defaultWagmiConfig({
  metadata,
  projectId,
  chains: [sepolia, zama],
  ssr: true, // If your dApp uses server side rendering (SSR)
  storage: createStorage({
    storage: cookieStorage
  })
})