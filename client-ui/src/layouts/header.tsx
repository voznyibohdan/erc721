import Link from "next/link";

export function Header() {
    return (
        <header className="header">
            <Link href={'/'}>Home</Link>
            <Link href={'/profile'}>Profile</Link>
            <Link href={'/proposals'}>Proposals</Link>

            <div>
                <w3m-button/>
            </div>
        </header>
    )
}