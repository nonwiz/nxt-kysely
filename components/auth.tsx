import {useSession} from "next-auth/react"
import {useRouter} from "next/router";
import {ReactNode} from "react";

// @ts-ignore
export default function Auth({ children, useAuth = true, role = "" }: { children: ReactNode, useAuth: Boolean}) {
    const { data, status } = useSession();
    const router = useRouter();
    if (status === "loading") {
        return <>...</>
    }
    if (status === "unauthenticated" && useAuth) {
        router.push("/auth/login");
    }

    if (role) {
        // @ts-ignore
        const userRole: string = data.session.user.role as string;
        const message = {
            'user_role': userRole,
            'page_role': role
        }
        console.log({message})
        if (userRole !== role) {
            alert(`You're not authorized for this view \n` + JSON.stringify(message, null, 4))
            // Handle as you wish
        }
    }
    return (
        <>
            {children}
        </>
    )
}
