const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZiODEyZTE4LTJiNTktNDE3YS04MjM0LTNjN2ZmM2I4ODhmMSIsIm9yZ0lkIjoiMzc2NDMyIiwidXNlcklkIjoiMzg2ODM5IiwidHlwZUlkIjoiM2U2MzJkZGQtZGE3Yy00MjU4LWFlMzItNWFkOWJkN2Y0NTkzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc0MzQ2MTgsImV4cCI6NDg2MzE5NDYxOH0.taqvV43C5F31nxXQE9ekA9QnLAP9mOSDs8s3js4Cvjc\n';

export const getUserNfts = async (address: string) => {
    const url = `https://deep-index.moralis.io/api/v2.2/${address}/nft/collections?chain=sepolia&format=decimal&media_items=false`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: "application/json", "X-API-Key": MORALIS_API_KEY },
    });

    return response.json();
}

export const getNftMetadata = async (tokenAddress: string) => {
    const url = `https://deep-index.moralis.io/api/v2.2/nft/${tokenAddress}/1?chain=sepolia&format=decimal&normalizeMetadata=true&media_items=false`;
    const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: "application/json", "X-API-Key": MORALIS_API_KEY },
    });

    return response.json();
}
