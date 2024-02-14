import {ethers} from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";
import {MNFT} from "../typechain-types";
import {expect} from "chai";
import abi from '../abi/MNFT.json';

describe('MNFT', () => {
    async function deploy() {
        const [owner, user1, user2]: HardhatEthersSigner[] = await ethers.getSigners();

        const Contract = await ethers.getContractFactory('MNFT');
        const contract: MNFT = await Contract.deploy();

        const provider = new ethers.JsonRpcProvider();
        const deployedContract = new ethers.Contract('0xBf7877CCB45f6d792c581fcbDd1150caD486B284', abi.abi, provider)

        return {deployedContract, contract, owner, user1,user2}
    }

    describe('getUserNftsAmount DEPLOYED', () => {
        it('should return user nft amount', async () => {
            const {deployedContract} = await deploy();
            const response = await deployedContract.getUserNftsAmount('0x580828B108f9B42D13eB5d7A1E70bBd9076C632d');
            console.log('deployedContract: ', response)
        });
    })

    describe('getUserNftsAmount DEPLOYED', () => {
        it('should return user nft amount', async () => {
            const {contract} = await deploy();
            const response = await contract.getUserNftsAmount('0x580828B108f9B42D13eB5d7A1E70bBd9076C632d');
            console.log('deployedContract: ', response)
        });
    })

    describe('mint', () => {
        it('Should increase totalSupply', async () => {
            const {contract, user1} = await deploy();

            const value = ethers.parseEther('0.1');
            await contract.connect(user1).mint({ value: value});

            const balance = await contract.balanceOf(user1.address);
            console.log('balance: ', balance);

            expect(await contract.totalSupply()).to.equal(1);
        });
    });

    describe('createOrder', () => {
        it('Should revert if nft doesnt exist of is user not the owner of nft', async () => {
            const {contract, user1, user2} = await deploy();

            const value = ethers.parseEther('0.1');
            const price = ethers.parseEther('1');

            await contract.connect(user1).mint({ value: value});
            await expect(contract.connect(user2).createOrder(1, price)).to.revertedWith('Not owner');
        });

        it('Should crete the order', async () => {
            const {contract, user1} = await deploy();
            const value = ethers.parseEther('0.1');
            const price = ethers.parseEther('1');
            await contract.connect(user1).mint({ value: value});

            await contract.connect(user1).createOrder(1, price);
            const orderId = await contract.test(0);
            // console.log('order id: ', orderId);

            expect(await contract.userOrders(orderId)).to.equal(user1.address);
        });
    });

    describe('createProposal', () => {
        it('Should create proposal', async () => {
            const {contract, user1, user2} = await deploy();

            const value = ethers.parseEther('0.1');
            await contract.connect(user1).mint({ value: value});
            await contract.connect(user1).createOrder(1, value);
            const orderId = await contract.test(0);

            const proposedPrice = ethers.parseEther('0.2');
            await contract.connect(user2).createProposal(orderId, { value: proposedPrice });
            const proposalId = await contract.test(1);

            expect(await contract.userProposals(proposalId)).to.equal(user1.address);
        });
    });
});