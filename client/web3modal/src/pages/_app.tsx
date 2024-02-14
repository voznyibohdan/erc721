import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import {Chain, WagmiConfig} from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	gnosis, localhost,
	mainnet,
	optimism,
	polygon,
	sepolia
} from "wagmi/chains";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const fork: Chain = {
	...localhost,
	id: 31337,
	rpcUrls: {
		default: {
			http: ['http://127.0.0.1:8545/'],
			webSocket: []
		},
		public: {
			http: ['http://127.0.0.1:8545/'],
			webSocket: []
		}
	}
}

const chains = [
	mainnet,
	sepolia,
	fork
];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
	name: "Next Starter Template",
	description: "A Next.js starter template with Web3Modal v3 + Wagmi",
	url: "https://web3modal.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const client = new ApolloClient({
	uri: 'https://api.studio.thegraph.com/query/477/mnft/v0.0.4',
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
			{ready ? (
				<ApolloProvider client={client}>
					<WagmiConfig config={wagmiConfig}>
						<Component {...pageProps} />
					</WagmiConfig>
				</ApolloProvider>
			) : null}
		</>
	);
}
