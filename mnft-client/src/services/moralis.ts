import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";

Moralis.start({
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZiODEyZTE4LTJiNTktNDE3YS04MjM0LTNjN2ZmM2I4ODhmMSIsIm9yZ0lkIjoiMzc2NDMyIiwidXNlcklkIjoiMzg2ODM5IiwidHlwZUlkIjoiM2U2MzJkZGQtZGE3Yy00MjU4LWFlMzItNWFkOWJkN2Y0NTkzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc0MzQ2MTgsImV4cCI6NDg2MzE5NDYxOH0.taqvV43C5F31nxXQE9ekA9QnLAP9mOSDs8s3js4Cvjc',
});

export const getUserNfts = async (address: string) => {
    const chain = EvmChain.SEPOLIA;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });

    return response.toJSON();
};

