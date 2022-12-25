// @ts-ignore
import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {randomBytes, randomUUID} from "crypto";

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      data: { label: "data", type: "hidden" }
    },
    async authorize(credentials, _req) {
      return JSON.parse(credentials?.data || '{}');
    }
  })
]

// @ts-ignore
const callbacks = {
  async jwt(token: any) {
    if (token.user) {
      return token.user;
    }
    if (token.token) {
      return token.token;
    }
    return {...token}
  },
// @ts-ignore
  async session({session, token}) {
    if (session.user) {
      session.user = { ...session.user, ...token }
    }
    return {session, token};
  }

}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    },
    pages: {
      signIn: '/auth/login',
      signOut: '/auth/login',
      error: '/auth/login',
    }

  }
}

// @ts-ignore
export default NextAuth(authOptions)
