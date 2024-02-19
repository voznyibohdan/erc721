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

    describe('image uri')

    //API Key: 27d61d399af1d145ff5c
    //API Secret: 721aeb3312895387a58ffdb71c55443418a888c6a0bc1bd3960b44c5a5c67a59
    //JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZTQ3NDcyNy0zYjljLTQ5MTgtODMzOS00NjY4ZTI1NTE3OWUiLCJlbWFpbCI6ImJvaGRhbi52b3pueWlAcmVkZHVjay5pbyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyN2Q2MWQzOTlhZjFkMTQ1ZmY1YyIsInNjb3BlZEtleVNlY3JldCI6IjcyMWFlYjMzMTI4OTUzODdhNThmZmRiNzFjNTU0NDM0MThhODg4YzZhMGJjMWJkMzk2MGI0NGM1YTVjNjdhNTkiLCJpYXQiOjE3MDgzNDQyOTR9.35CpZnYEB8p08H4ydDI-HyXThQxUwWthHffNmfCsmHs

    // describe('getUserNftsAmount DEPLOYED', () => {
    //     it('should return user nft amount', async () => {
    //         const {deployedContract} = await deploy();
    //         const response = await deployedContract.getUserNftsAmount('0x580828B108f9B42D13eB5d7A1E70bBd9076C632d');
    //         console.log('deployedContract: ', response)
    //     });
    // })

    // describe('getUserNftsAmount DEPLOYED', () => {
    //     it('should return user nft amount', async () => {
    //         const {contract} = await deploy();
    //         const response = await contract.getUserNftsAmount('0x580828B108f9B42D13eB5d7A1E70bBd9076C632d');
    //         console.log('deployedContract: ', response)
    //     });
    // })

    // describe('mint', () => {
    //     it('Should increase totalSupply', async () => {
    //         const {contract, user1} = await deploy();
    //
    //         const value = ethers.parseEther('0.1');
    //         await contract.connect(user1).mint({ value: value});
    //
    //         const balance = await contract.balanceOf(user1.address);
    //         console.log('balance: ', balance);
    //
    //         expect(await contract.totalSupply()).to.equal(1);
    //     });
    // });

    // describe('createOrder', () => {
    //     it('Should revert if nft doesnt exist of is user not the owner of nft', async () => {
    //         const {contract, user1, user2} = await deploy();
    //
    //         const value = ethers.parseEther('0.1');
    //         const price = ethers.parseEther('1');
    //
    //         await contract.connect(user1).mint({ value: value});
    //         await expect(contract.connect(user2).createOrder(1, price)).to.revertedWith('Not owner');
    //     });
    //
    //     it('Should crete the order', async () => {
    //         const {contract, user1} = await deploy();
    //         const value = ethers.parseEther('0.1');
    //         const price = ethers.parseEther('1');
    //         await contract.connect(user1).mint({ value: value});
    //
    //         await contract.connect(user1).createOrder(1, price);
    //         const orderId = await contract.test(0);
    //         // console.log('order id: ', orderId);
    //
    //         expect(await contract.userOrders(orderId)).to.equal(user1.address);
    //     });
    // });

    // describe('createProposal', () => {
    //     it('Should create proposal', async () => {
    //         const {contract, user1, user2} = await deploy();
    //
    //         const value = ethers.parseEther('0.1');
    //         await contract.connect(user1).mint({ value: value});
    //         await contract.connect(user1).createOrder(1, value);
    //         const orderId = await contract.test(0);
    //
    //         const proposedPrice = ethers.parseEther('0.2');
    //         await contract.connect(user2).createProposal(orderId, { value: proposedPrice });
    //         const proposalId = await contract.test(1);
    //
    //         expect(await contract.userProposals(proposalId)).to.equal(user1.address);
    //     });
    // });
});