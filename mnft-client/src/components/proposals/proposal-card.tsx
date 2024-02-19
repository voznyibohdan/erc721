import {Proposal} from "@/types";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {acceptProposal} from "@/services/contract";
import {formatEther} from "viem";
import {getTransactionConfirmations} from "viem/actions";

type ProposalCardProps = {
    proposal: Proposal
}

export function ProposalCard({ proposal }: ProposalCardProps) {
    const handleAcceptProposal = async () => {
        await acceptProposal(proposal.orderId, proposal.id);
    }

    const formattedPrice = formatEther(BigInt(proposal.price));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Proposal</CardTitle>
            </CardHeader>
            <CardContent>
                <p>nft id: {proposal.nft}</p>
                <p>nft price: {formattedPrice}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleAcceptProposal}>Accept proposal</Button>
            </CardFooter>
        </Card>
    );
}