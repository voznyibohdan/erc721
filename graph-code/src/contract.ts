import {
  Approval,
  ApprovalForAll,
  Mint,
  OrderClosed,
  OrderPlaced,
  ProposalPlaced,
  Transfer
} from "../generated/MNFT/MNFT";
import {Order, Proposal} from '../generated/schema';

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleMint(event: Mint): void {}

export function handleOrderClosed(event: OrderClosed): void {
  let orderEntity = Order.load(event.params.orderId.toString());
  let proposalEntity = Proposal.load(event.params.proposalId.toString());

  if (orderEntity && proposalEntity) {
    orderEntity.isClosed = true;
    proposalEntity.isClosed = true;

    orderEntity.save();
    proposalEntity.save();
  }
}

export function handleOrderPlaced(event: OrderPlaced): void {
  let entity = new Order(event.params.id.toString());

  entity.id = event.params.id.toString();
  entity.nft = event.params.nft;
  entity.price = event.params.price;
  entity.isClosed = event.params.isClosed;
  entity.owner = event.params.owner;

  entity.save();
}

export function handleProposalPlaced(event: ProposalPlaced): void {
  let entity = new Proposal(event.params.id.toString());

  entity.id = event.params.id.toString();
  entity.orderId = event.params.orderId;
  entity.nft = event.params.nft;
  entity.price = event.params.price;
  entity.isClosed = event.params.isClosed;
  entity.author = event.params.author;
  entity.orderOwner = event.params.orderOwner;

  entity.save();
}

export function handleTransfer(event: Transfer): void {}
