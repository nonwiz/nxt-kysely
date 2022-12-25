import { SessionProvider } from "next-auth/react"
import "./styles.css"

import type { AppProps } from "next/app"
// @ts-ignore
import type { Session } from "next-auth"
import {StateMachineProvider, createStore} from "little-state-machine";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.

createStore({});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <StateMachineProvider>
      <Component {...pageProps} />
      </StateMachineProvider>
    </SessionProvider>
  )
}
