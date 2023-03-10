import Layout from "../components/layout"

export default function IndexPage() {
  return (
    <Layout useAuth={false}>
      <h1 className={"bg-red-400"}>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
    </Layout>
  )
}
