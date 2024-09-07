import { WagmiProvider, createClient } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet } from 'wagmi/chains';

// Setup queryClient
const queryClient = new QueryClient();

// Your WalletConnect Cloud project ID
const projectId = 'bdc18525d360125a93aaadb04c2c6bf9';

// Create wagmiConfig
const metadata = {
    name: 'project1',
    description: 'AppKit Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    // Add additional wagmiOptions if needed
});

// Create the wagmi client
const wagmiClient = createClient(config);

// Initialize Web3Modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
});

interface Web3ModalProviderProps {
    children: React.ReactNode;
}

export function Web3ModalProvider({ children }: Web3ModalProviderProps) {
    return (
        <WagmiProvider config = { wagmiClient } >
        <QueryClientProvider client={ queryClient }>
            { children }
            </QueryClientProvider>
            </WagmiProvider>
    );
}
