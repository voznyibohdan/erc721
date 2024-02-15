import { useQuery, gql } from '@apollo/client';

const GET_ORDERS = gql`
    query GetOrders {
        orders {
            id
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(GET_ORDERS);

    console.log('orders: ', data);

    return (
        <main>
            my app
        </main>
    );
}
