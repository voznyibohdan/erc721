// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MNFT is ERC721, ERC721URIStorage {
    uint256 public immutable MAX_SUPPLY = 10000;
    uint256 public totalSupply;
    uint256 public mintPrice = 0.1 ether;

    struct Order {
        uint256 id;
        uint256 nft;
        uint256 price;
        bool isClosed;
        address owner;
    }

    struct Proposal {
        uint256 id;
        uint256 orderId;
        uint256 nft;
        uint256 price;
        bool isClosed;
        address author;
        address orderOwner;
    }

    uint256[] public test;

    mapping(uint256 => Order) public orders;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => address) public userOrders;
    mapping(uint256 => address) public userProposals;
    mapping(address => uint256) public withdrawAllowance;

    event OrderPlaced(
        uint256 id,
        uint256 nft,
        uint256 price,
        bool isClosed,
        address owner
    );

    event ProposalPlaced(
        uint256 id,
        uint256 orderId,
        uint256 nft,
        uint256 price,
        bool isClosed,
        address author,
        address orderOwner
    );

    event Mint(address user, uint256 nft, uint256 time);
    event OrderClosed(uint256 orderId, uint256 proposalId, uint256 time);

    constructor() ERC721("MyNFT", "MNFT") {
    }

    function setTokenURI(uint256 _tokenId, string memory _tokenURI) external {
        require(ownerOf(_tokenId) == msg.sender, "not owner");
        _setTokenURI(_tokenId, _tokenURI);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function mint() external payable {
        require(msg.value == mintPrice, "Wrong value");
        require(MAX_SUPPLY > totalSupply, "Sold out");

        totalSupply++;
        uint256 tokenId = totalSupply;
        _safeMint(msg.sender, tokenId);

        emit Mint(msg.sender, tokenId, block.timestamp);
    }

    function getUserNftsAmount(address _account) external view returns (uint256) {
        return balanceOf(_account);
    }

    function getNftOwner(uint256 nft) external returns(address) {
        return ownerOf(nft);
    }

    function withdraw() external payable {
        require(withdrawAllowance[msg.sender] > 0, "Insufficient balance");
        uint256 balance = withdrawAllowance[msg.sender];
        withdrawAllowance[msg.sender] = 0;

        payable(msg.sender).transfer(balance);
    }

    function createOrder(uint256 _nft, uint256 _price) external returns (uint256) {
        uint256 orderId = uint256(keccak256(abi.encodePacked(msg.sender, _nft, _price)));
        Order memory order = Order({
            id: orderId,
            nft: _nft,
            price: _price,
            isClosed: false,
            owner: msg.sender
        });

        orders[orderId] = order;
        userOrders[orderId] = msg.sender;

        test.push(orderId);

        emit OrderPlaced(order.id, order.nft, order.price, order.isClosed, order.owner);
        return orderId;
    }

    function createProposal(uint256 _orderId) external payable returns (uint256) {
        require(msg.value >= mintPrice, "Wrong value");

        address payable contractAddress = payable(address(this));
        contractAddress.transfer(msg.value);

        withdrawAllowance[msg.sender] = msg.value;

        Order memory order = orders[_orderId];

        uint256 proposalId = uint256(keccak256(abi.encodePacked(msg.sender, order.nft, msg.value)));
        Proposal memory proposal = Proposal({
            id: proposalId,
            orderId: _orderId,
            nft: order.nft,
            price: msg.value,
            isClosed: false,
            author: msg.sender,
            orderOwner: order.owner
        });

        proposals[proposalId] = proposal;
        userProposals[proposalId] = order.owner;
        test.push(proposalId);

        emit ProposalPlaced(
            proposal.id,
            proposal.orderId,
            proposal.nft,
            proposal.price,
            proposal.isClosed,
            proposal.author,
            proposal.orderOwner
        );
        return proposalId;
    }

    function closeOrder(uint256 _orderId, uint256 _proposalId) external payable {
        require(userOrders[_orderId] == msg.sender, "Not the order owner");
        Proposal memory proposal = proposals[_proposalId];
        require(proposal.orderId == _orderId, "Wrong proposal id");

        delete userOrders[_orderId];
        delete orders[_orderId];

        _safeTransfer(msg.sender, proposal.author, proposal.nft);
        emit OrderClosed(_orderId, _proposalId, block.timestamp);
    }

    receive() external payable {
    }
}
