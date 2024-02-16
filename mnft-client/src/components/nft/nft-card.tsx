import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ChangeEvent, useState} from "react";
import {createOrder} from "@/services/contract";
import {parseEther} from "viem";

type NftCard = {
    id: string;
    name: string;
}

export function NftCard({ id, name }: NftCard) {
    const [price, setPrice] = useState(0.1);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(event.target.value));
    }

    const handleCreateOrder = async () => {
        console.log('NFT PRICE: ', price.toString());
        await createOrder(parseInt(id), parseEther(price.toString()));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Name</CardTitle>
                <CardDescription>{name}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>nft id: {id}</p>
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
                                Create order for nftt with id {id}
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