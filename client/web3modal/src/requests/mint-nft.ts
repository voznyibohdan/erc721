import { prepareWriteContract, writeContract } from '@wagmi/core'
import abi from '@/abi/MNFT.json';
import {parseEther} from "viem";
import {config} from './config';

export const mintNft = async () => {
    const { request, result } = await prepareWriteContract({
        // @ts-ignore
        address: config.contractAddress,
        abi: abi.abi,
        functionName: 'mint',
        value: parseEther('0.1')
    });

    console.log('result: ', result)

    const { hash } = await writeContract(request);

    return hash;
}