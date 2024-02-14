import {ethers} from "hardhat";

const deployedMnftAddress = '0xBf7877CCB45f6d792c581fcbDd1150caD486B284';
const userAddress = '0x580828B108f9B42D13eB5d7A1E70bBd9076C632d'

// yarn hardhat run scripts/test-script.ts --network localhost
export async function testScript() {
    const mnft = await ethers.getContractAt('MNFT', deployedMnftAddress);

    const response = await mnft.getUserNftsAmount(userAddress);
    console.log('##### response: ', response);
}

testScript()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })