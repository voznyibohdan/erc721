// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MNFT is ERC721 {
    uint256 public immutable MAX_SUPPLY = 10000;
    uint256 public totalSupply;
    uint256 public mintPrice = 0.1 ether;

    struct Order {
        address owner;
        uint256 nft;
        uint256 price;
    }

    struct Proposal {
        address user;
        uint256 orderId;
        uint256 nft;
        uint256 price;
    }

    uint256[] public test;

    mapping(uint256 => Order) public orders;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => address) public userOrders;
    mapping(uint256 => address) public userProposals;
    mapping(address => uint256) public withdrawAllowance;

    event Mint(address user, uint256 nft, uint256 time);
    event OrderPlaced(address user, uint256 nft, uint256 price, uint256 time);
    event ProposalPlaced(address user, uint256 orderId, uint256 price, uint256 time);
    event OrderClosed(uint256 orderId, uint256 proposalId, uint256 time);

    constructor() ERC721("MyNFT", "MNFT") {
    }

    function mint() external payable {
        require(msg.value == mintPrice, "Wrong value");
        require(MAX_SUPPLY > totalSupply, "Sold out");

        totalSupply++;
        uint256 tokenId = totalSupply;
        _safeMint(msg.sender, tokenId);

        emit Mint(msg.sender, tokenId, block.timestamp);
    }

    function getUserNftsAmount(address _account) external view returns(uint256) {
        return balanceOf(_account);
    }

    function withdraw() external payable {
        require(withdrawAllowance[msg.sender] > 0, "Insufficient balance");
        uint256 balance = withdrawAllowance[msg.sender];
        withdrawAllowance[msg.sender] = 0;

        payable(msg.sender).transfer(balance);
    }

    function createOrder(uint256 _nft, uint256 _price) external returns(uint256) {
        require(ownerOf(_nft) == msg.sender, "Not owner");
        Order memory order = Order({owner: msg.sender, nft : _nft, price : _price});

        uint256 orderId = uint256(keccak256(abi.encodePacked(msg.sender, _nft, _price)));
        orders[orderId] = order;
        userOrders[orderId] = msg.sender;

        test.push(orderId);

        emit OrderPlaced(msg.sender, _nft, _price, block.timestamp);
        return orderId;
    }

    function createProposal(uint256 _orderId) external payable returns(uint256) {
        require(msg.value >= mintPrice, "Wrong value");

        address payable contractAddress = payable(address(this));
        contractAddress.transfer(msg.value);

        withdrawAllowance[msg.sender] = msg.value;

        Order memory order = orders[_orderId];
        Proposal memory proposal = Proposal({
            user: msg.sender,
            orderId: _orderId,
            nft: order.nft,
            price: msg.value
        });

        uint256 proposalId = uint256(keccak256(abi.encodePacked(msg.sender, order.nft, msg.value)));
        proposals[proposalId] = proposal;
        userProposals[proposalId] = order.owner;
        test.push(proposalId);

        emit ProposalPlaced(msg.sender, _orderId, msg.value, block.timestamp);
        return proposalId;
    }

    function closeOrder(uint256 _orderId, uint256 _proposalId) external payable {
        require(userOrders[_orderId] == msg.sender, "Not the order owner");
        Proposal memory proposal = proposals[_proposalId];
        require(proposal.orderId == _orderId, "Wrong proposal id");

        delete userOrders[_orderId];
        delete orders[_orderId];

        _safeTransfer(msg.sender, proposal.user, proposal.nft);
        emit OrderClosed(_orderId, _proposalId, block.timestamp);
    }

    receive() external payable {
    }
}