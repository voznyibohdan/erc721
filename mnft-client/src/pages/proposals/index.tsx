import { useQuery, gql } from '@apollo/client';
import {ProposalsList} from "@/components/proposals/proposals-list";

const GET_PROPOSALS = gql`
    query GetProposals($owner: String!) {
        proposals(where: {orderOwner: $owner}) {
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

    const { loading, error, data } = useQuery(GET_PROPOSALS, {
        variables: { owner: '0x580828B108f9B42D13eB5d7A1E70bBd9076C632d' },
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