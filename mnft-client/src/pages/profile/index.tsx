import {getUserNfts} from "@/services";
import {useAccount} from "wagmi";
import {useEffect, useState} from "react";
import {NftCard} from "@/components/nft/nft-card";
import {NFT} from "@/types";
import {Button} from "@/components/ui/button";
import {mintNft} from "@/services/contract";

export default function ProfilePage() {
    const { address } = useAccount();
    const [nfts, setNfts] = useState<NFT[]>([]);

    const fetchNfts = async (address: string) => {
        return await getUserNfts(address);
    }

    useEffect(() => {
        if (address) {
            fetchNfts(address).then(response => {
                // @ts-ignore
                setNfts(response.result);
            });
        }
    }, [address]);

    const handleMintNft =  async () => {
        await mintNft();
    }

    return (
        <main>
            <div className="pageTitle">
                <h2>User nfts</h2>
                <Button onClick={handleMintNft}>Mint one nft</Button>
            </div>
            <div className="nftContainer">
                {nfts.map((nft:NFT) => <NftCard id={nft.token_id} name={nft.name} key={nft.token_id} />)}
            </div>
        </main>
    )
}