import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export function Header() {
    const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
        useState(false);
    const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

    const closeAll = () => {
        setIsNetworkSwitchHighlighted(false);
        setIsConnectHighlighted(false);
    };

    return (
        <header>
            <div
                className={styles.backdrop}
                style={{
                    opacity:
                        isConnectHighlighted || isNetworkSwitchHighlighted
                            ? 1
                            : 0,
                }}
            />

            <div className={styles.header}>
                <div className={styles.logo}>
                    <Image
                        src="/logo.svg"
                        alt="WalletConnect Logo"
                        height="32"
                        width="203"
                    />
                </div>
                <div>
                    <Link href={'/orders'}>ORDERS</Link>
                </div>
                <div className={styles.buttons}>
                    <div
                        onClick={closeAll}
                        className={`${styles.highlight} ${
                            isNetworkSwitchHighlighted
                                ? styles.highlightSelected
                                : ``
                        }`}
                    >
                        <w3m-network-button/>
                    </div>
                    <div
                        onClick={closeAll}
                        className={`${styles.highlight} ${
                            isConnectHighlighted
                                ? styles.highlightSelected
                                : ``
                        }`}
                    >
                        <w3m-button/>
                    </div>
                </div>
            </div>
        </header>
    )
}