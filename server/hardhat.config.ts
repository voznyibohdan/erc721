import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import * as dotenv from 'dotenv';

dotenv.config();

const SEPOLIA_HTTPS = process.env.SEPOLIA_HTTPS || '';
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || '';

const MNFT_API_URL = process.env.MNFT_API_URL || '';
const MNFT_PRIVATE_KEY = process.env.MNFT_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: MNFT_API_URL,
            accounts: [`0x${MNFT_PRIVATE_KEY}`]
        },
        hardhat: {
            blockGasLimit: 200_000_000,
            allowUnlimitedContractSize: true,
            chainId: 31337,
            forking: {
                // url: MAINNET_HTTPS
                url: SEPOLIA_HTTPS
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
