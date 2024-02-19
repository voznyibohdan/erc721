import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ChangeEvent, useEffect, useState} from "react";
import {createOrder} from "@/services/contract";
import {parseEther} from "viem";
import {getNftMetadata} from "@/services";
import {NFT} from "@/types";
import {useWaitForTransaction} from "wagmi";

type NftCard = {
    nft: NFT
}

export function NftCard({ nft }: NftCard) {
    const tokenAddress = nft.token_address;
    const [price, setPrice] = useState(0.1);
    const [hash, setHash] = useState('');
    const [metadata, setMetadata] = useState<any>();

    const {isLoading, isSuccess} = useWaitForTransaction({
        // @ts-ignore
        hash: hash,
    });

    console.log(`Transaction loading: ${isLoading}, is transaction success: ${isSuccess}`);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(event.target.value));
    }

    const handleCreateOrder = async () => {
        const convprice = parseEther(price.toString());
        // @ts-ignore
        const response = await createOrder(metadata?.token_id, parseInt(convprice.toString()));
        setHash(response);
    }

    const fetchMetadata = async (address: string) => {
        return await getNftMetadata(address);
    }

    useEffect(() => {
        if (tokenAddress) {
            fetchMetadata(tokenAddress).then(response => {
                console.log('metadata: ', response);
                setMetadata(response);
            });
        }
    }, [tokenAddress]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Name</CardTitle>
                <CardDescription>{nft.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>nft id: {metadata?.token_id}</p>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Create order</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create order</DialogTitle>
                            <DialogDescription>
                                Create order for nftt with id {metadata?.token_id}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Price
                                </Label>
                                <Input
                                    type="number"
                                    id="link"
                                    value={price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <Button onClick={handleCreateOrder} type="button" variant="secondary">
                                Create order
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}