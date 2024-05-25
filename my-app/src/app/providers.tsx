"use client"

import { config, projectId} from '../lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

import { createWeb3Modal } from '@web3modal/wagmi/react'
//import { WalletConnectModal } from '@walletconnect/modal'


import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  themeMode: 'light',
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--w3m-accent':'#E8FB6C',
    '--w3m-color-mix': '#E8FB6C',
    '--w3m-color-mix-strength': 80,
  }
})


export function Providers({
    children,
    initialState,
  }: Readonly<{
    children: React.ReactNode
    initialState?: State
  }>) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        </WagmiProvider>

    )
}