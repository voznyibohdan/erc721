import {prepareWriteContract, readContract, writeContract} from '@wagmi/core'
import abi from '@/abi/MNFT.json';
import {config} from './config'

export const getUserNfts = async () => {
    const data = await readContract({
        // @ts-ignore
        address: config.contractAddress,
        abi: abi.abi,
        functionName: 'getUserNftsAmount',
        args: ['0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'],
        chainId: 31337
    })

    return data;
}