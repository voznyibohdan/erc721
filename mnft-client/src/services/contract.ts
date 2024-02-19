import {prepareWriteContract, writeContract} from "@wagmi/core";
import {abi} from '@/abi'
import {parseEther} from "viem";

const contractAddress = '0x9AAfA94965053A49a3F1578Fa3CFC061DC8Ec6dC';

export const mintNft = async () => {
    const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: 'mint',
        value: parseEther('0.1')
    });

    const { hash } = await writeContract(request);
    return hash;
}

export const createOrder = async (tokenId: string, price: number) => {
    const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: 'createOrder',
        // @ts-ignore
        args: [tokenId, parseInt(price)],
    });

    const { hash } = await writeContract(request);
    return hash;
}

export const createProposal = async (orderId: string, price: bigint) => {
    const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: 'createProposal',
        // @ts-ignore
        args: [orderId],
        value: price
    });

    const { hash } = await writeContract(request);
    return hash;
}

export const acceptProposal = async (orderId: string, proposalId: string) => {
    const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: 'closeOrder',
        // @ts-ignore
        args: [orderId, proposalId],
    });

    const { hash } = await writeContract(request);
    return hash;
}
