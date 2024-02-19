import { useQuery, gql } from '@apollo/client';
import {ProposalsList} from "@/components/proposals/proposals-list";
import {useAccount} from "wagmi";

const GET_PROPOSALS = gql`
    query GetProposals($owner: String!) {
        proposals(where: {orderOwner: $owner, isClosed: false}) {
            id
            orderId
            nft
            price
            isClosed
            author
            orderOwner
        }
    }
`;

export default function ProposalsPage() {
    const { address } = useAccount();
    const { loading, error, data } = useQuery(GET_PROPOSALS, {
        variables: { owner: address },
    });
    console.log('orders: ', data);
    console.log('error: ', error);

    return (
        <main>
            proposals page
            {loading ? 'loading...' : <ProposalsList proposals={data.proposals} />}
        </main>
    );
}