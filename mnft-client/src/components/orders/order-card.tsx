import styles from './orders.module.css';

import {Order} from "@/types";
import {formatEther, parseEther} from "viem";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ChangeEvent, useState} from "react";
import {createProposal} from "@/services/contract";

type OrderCardProps = {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const convertedPrice = formatEther(BigInt(order.price));

    const [price, setPrice] = useState<number>(0.1);

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseFloat(event.target.value));
    }

    const handleCreateProposal = async () => {
        console.log(`proposal price: ${price}, order id: ${order.id}`);
        await createProposal(order.id, parseEther(price.toString()));
    }

    return (
        <div className={styles.card}>
            <ul>
                <li>nft: {order.nft}</li>
                <li>owner: {order.owner}</li>
                <li>price: {convertedPrice}</li>
            </ul>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create proposal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create order</DialogTitle>
                        <DialogDescription>
                            Create proposal for nft {order.nft}
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
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button onClick={handleCreateProposal} type="button">
                            Create order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
