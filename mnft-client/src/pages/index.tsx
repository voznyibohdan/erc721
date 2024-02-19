import { Inter } from "next/font/google";
import { useQuery, gql } from '@apollo/client';
import { OrdersList } from "@/components/orders/orders-list";

const inter = Inter({subsets: ["latin"]});

const GET_ORDERS = gql`
    query GetOrders {
        orders(where: {isClosed: false}) {
            id
            nft
            price
            isClosed
            owner
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(GET_ORDERS);
    console.log('orders: ', data);
    console.log('error: ', error);

    return (
        <main className={inter.className}>
            <div>
                <h3>home page</h3>
                <button>create order</button>
            </div>

            {loading ? 'loading...' : <OrdersList orders={data.orders} />}
        </main>
    );
}
