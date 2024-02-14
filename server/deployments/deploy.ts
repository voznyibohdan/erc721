import {ethers} from "hardhat";

async function main() {
    const MNFT = await ethers.getContractFactory("MNFT");
    const mnft = await MNFT.deploy();
    const address = await mnft.getAddress();
    // @ts-ignore
    console.log("Contract Deployed to Address:", address);
}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });