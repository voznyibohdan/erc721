import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {Web3Modal} from "@/context/Web3Modal";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Header} from "@/layouts/header";

const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/477/mnft/v0.0.4',
    cache: new InMemoryCache(),
});

export default function App({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Web3Modal>
                <Header />
                <Component {...pageProps} />
            </Web3Modal>
        </ApolloProvider>
    );
}
