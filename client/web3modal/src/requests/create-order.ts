import {prepareWriteContract, readContract, writeContract} from '@wagmi/core'
import abi from '@/abi/MNFT.json';

import {config} from "./config";

export const createOrder = async () => {
    const { request } = await prepareWriteContract({
        // @ts-ignore
        address: config.contractAddress,
        abi: abi.abi,
        functionName: 'createOrder',
        args: [1, 1]
    });

    const { hash } = await writeContract(request);

    const data = await readContract({
        // @ts-ignore
        address: config.contractAddress,
        abi: abi.abi,
        functionName: 'createOrder',
        args: [2,1],
        chainId: 31337
    });

    console.log('CREATE DATA: ', data)

    return data;
}

