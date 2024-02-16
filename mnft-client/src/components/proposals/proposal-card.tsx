import {Proposal} from "@/types";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {acceptProposal} from "@/services/contract";

type ProposalCardProps = {
    proposal: Proposal
}

export function ProposalCard({ proposal }: ProposalCardProps) {
    const handleAcceptProposal = async () => {
        await acceptProposal(proposal.orderId, proposal.id);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Proposal</CardTitle>
            </CardHeader>
            <CardContent>
                <p>nft id: {proposal.nft}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleAcceptProposal}>Accept proposal</Button>
            </CardFooter>
        </Card>
    );
}