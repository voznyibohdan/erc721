import styles from './orders.module.css';

import {Order} from "@/types";

type OrderCardProps = {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    return (
        <div className={styles.card}>
            <ul>
                <li>id: {order.id}</li>
                <li>nft: {order.nft}</li>
                <li>owner: {order.owner}</li>
            </ul>
        </div>
    )
}
