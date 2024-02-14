import {readContract} from "@wagmi/core";
import {config} from "@/requests/config";
import abi from "@/abi/MNFT.json";

const orderId = '21966664722980185747045365134633822547908310080052694270561211567954627490711';

export const getOrder = async () => {
    const data = await readContract({
        // @ts-ignore
        address: config.contractAddress,
        abi: abi.abi,
        functionName: 'orders',
        args: [orderId],
        chainId: 31337
    })

    return data;
}