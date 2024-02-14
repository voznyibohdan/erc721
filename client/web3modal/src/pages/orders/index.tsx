"use client";

import {useQuery, gql} from '@apollo/client';
import {createOrder, getOrder, getUserNfts, mintNft} from "@/requests";
import {res} from "pino-std-serializers";

const GET_ORDERS = gql`
    query GetOrders {
        orders {
            id
            price
        }
    }
`;

export default function Page() {
    const { loading, error, data } = useQuery(GET_ORDERS);
    console.log('GET_ORDERS: ', data);

    const handleMintNftClick = async () => {
        const response = await mintNft();
        console.log(response)
    }

    const handleGetUserNftsClick = async () => {
        const response = await getUserNfts();
        console.log(response);
    }

    const handleCreateOrderClick = async () => {
        const response = await createOrder();
        console.log(response);
    }

    return <main>
        <h1>orders list</h1>
        <button onClick={handleMintNftClick}>mint nft</button>
        <button onClick={handleGetUserNftsClick}>get user nfts</button>
        <button onClick={handleCreateOrderClick}>create order</button>
    </main>;
}