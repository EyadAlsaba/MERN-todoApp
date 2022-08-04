import '@/styles/globals.css'
import { HandlersProvider } from "../context/clientHandlers.js"
import Layout from '@/components/layout'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <HandlersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HandlersProvider>
    </SessionProvider>
  )
}

export default MyApp
