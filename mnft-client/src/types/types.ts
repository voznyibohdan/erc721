type address =  `0x${string}`;

export type Order = {
    id: string;
    nft: string;
    price: string;
    isClosed: boolean;
    owner: address;
}

export type Proposal = {
    id: string
    orderId: string
    nft: string
    price: string
    isClosed: boolean
    author: address
    orderOwner: address
}

export type NFT = {
    amount :string;
    block_number: string;
    block_number_minted: string;
    collection_banner_image: string;
    collection_logo: string;
    contract_type: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata?: string | undefined;
    minter_address: string;
    name: string;
    owner_of: string;
    possible_spam: boolean;
    symbol: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri?: string | undefined;
    verified_collection?: boolean | undefined;
}