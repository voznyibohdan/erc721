import {prepareWriteContract, writeContract} from "@wagmi/core";
import {abi} from '@/abi'
import {parseEther} from "viem";

export const mintNft = async () => {
    const { request } = await prepareWriteContract({
        address: '0x9AAfA94965053A49a3F1578Fa3CFC061DC8Ec6dC',
        abi: abi,
        functionName: 'mint',
        value: parseEther('0.1')
    });

    const { hash } = await writeContract(request);
    return hash;
}

export const createOrder = async (tokenId: number, price: number) => {
    const { request } = await prepareWriteContract({
        address: '0x9AAfA94965053A49a3F1578Fa3CFC061DC8Ec6dC',
        abi: abi,
        functionName: 'createOrder',
        // @ts-ignore
        args: [tokenId, price],
    });

    const { hash } = await writeContract(request);
    return hash;
}
