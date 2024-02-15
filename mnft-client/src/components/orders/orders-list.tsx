import styles from './orders.module.css';

import { Order } from "@/types";
import { OrderCard } from "./order-card";

type OrdersListProps = {
    orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
    console.log('orders list: ', orders);

    return (
        <div className={styles.container}>
            {orders.map((order: Order) => <OrderCard order={order} key={order.id} />)}
        </div>
    );
}
