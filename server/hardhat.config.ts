import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
const config: HardhatUserConfig = {
    solidity: "0.8.20",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            blockGasLimit: 200_000_000,
            allowUnlimitedContractSize: true,
            chainId: 31337,
            forking: {
                url: ''
            }
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
            blockGasLimit: 200_000_000,
            gas: 2_100_000,
            gasPrice: 80_000_000_000,
        }
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0
        },
    },
};

export default config;
