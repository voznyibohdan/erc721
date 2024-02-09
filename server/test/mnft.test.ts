import {ethers} from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";
import {MNFT} from "../typechain-types";
import {expect} from "chai";

describe('MNFT', () => {
    async function deploy() {
        const [owner, user1, user2]: HardhatEthersSigner[] = await ethers.getSigners();

        const Contract = await ethers.getContractFactory('MNFT');
        const contract: MNFT = await Contract.deploy();

        return {contract, owner, user1,user2}
    }

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