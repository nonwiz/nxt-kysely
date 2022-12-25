import { useFetcher } from "@/lib/fetcher"
import Layout from "@/components/layout"
import {useRouter} from "next/router";

export default function RegisterPage() {
    const router = useRouter();

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const formInputs = [...form.elements].filter(i => i.name);
        const data: any = {};
        formInputs.forEach(i => {
            data[i.name] = i.value;
        })
        await useFetcher(form.action, data, "POST").then(d => {
            if (d.success) {
                router.push('/auth/login');
            } else {
                alert(JSON.stringify(d, null, 2))
            }
        })

    }

    // @ts-ignore
    return (
        <Layout useAuth={false}>
            <h1 className={"text-4xl mb-2"}>Register</h1>
            <form method="POST" action="/api/users" onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" />
                <input type="text" name="firstName" placeholder="firstname" />
                <input type="text" name="lastName" placeholder="lastName" />
                <input type="password" name="password" placeholder="password" />
                <input type={"text"} name={"role"} placeholder={"role"} />
                <br />
                <button>Submit</button>
            </form>
        </Layout>
    )
}