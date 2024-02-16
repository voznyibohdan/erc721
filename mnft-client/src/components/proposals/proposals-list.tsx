import {Proposal} from "@/types";
import {ProposalCard} from "@/components/proposals/proposal-card";

type ProposalsListProps = {
    proposals: Proposal[]
}

export function ProposalsList({ proposals }: ProposalsListProps) {
    console.log('proposals list: ', proposals);

    return (
        <div>
            {proposals.map(proposal => <ProposalCard proposal={proposal} key={proposal.id} />)}
        </div>
    );
}
