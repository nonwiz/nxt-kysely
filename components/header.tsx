import Link from "next/link"
import {signIn, signOut, useSession} from "next-auth/react"
import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both kysely and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const {data: session, status} = useSession()
    const loading = status === "loading"
    console.log(session)

    if (loading) {
        return "loading..."
    }

    return (
        <header>
            <div>
                <p>
                    {!session && (
                        <>
              <span>
                You are not signed in
              </span>
                            <a
                                href={`/api/auth/signin`}
                                className={styles.buttonPrimary}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signIn()
                                }}
                            >
                                Sign in
                            </a>
                        </>
                    )}
                    {session?.user && (
                        <>
              <span>
                <small>Signed in as</small>
                <br/>
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
                            <a
                                href={`/api/auth/signout`}
                                className={styles.button}
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                            >
                                Sign out
                            </a>
                        </>
                    )}
                </p>
            </div>
            <nav>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/client">Client</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/server">Server</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/protected">Protected</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/api-example">API</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/admin">Admin</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/me">Me</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
