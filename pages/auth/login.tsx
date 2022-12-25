import {useFetcher} from '@/lib/fetcher';
import {signIn} from 'next-auth/react';
import Layout from "@/components/layout";


const Login = () => {

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const { email: emailEle, password: passwordEle } = form.elements;
        const email = emailEle.value;
        const password = passwordEle.value;
        await useFetcher(form.action, { email, password }, "PATCH").then(d => {
            if (d.success && d.entities.user) {
                signIn("credentials", { data: JSON.stringify(d.entities.user), callbackUrl: '/' });
            } else {
                alert(d.message)
            }
        })
    }

    return (

        <Layout useAuth={false}>
            <h1 className={"text-4xl mb-2"}>Login</h1>
            <form method="PATCH" action="/api/users" onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" />
               <input type="password" name="password" placeholder="password" />
                <br />
                <button>Submit</button>
            </form>
        </Layout>
    )

}

export default Login;