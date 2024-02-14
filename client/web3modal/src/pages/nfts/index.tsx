import { useEvmNativeBalance, useEvmWalletNFTCollections } from '@moralisweb3/next';

export default function Page() {
    const address = '0x580828B108f9B42D13eB5d7A1E70bBd9076C632d';
    const { data: nativeBalance } = useEvmNativeBalance({ address });
    const { data } = useEvmWalletNFTCollections({ address });

    console.log('NFT DATA: ',   data)

    return (
        <main>
            <h3>Wallet: {address}</h3>
            <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
        </main>
    )
}