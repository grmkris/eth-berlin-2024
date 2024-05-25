"use client"

import { config, projectId} from '../lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
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