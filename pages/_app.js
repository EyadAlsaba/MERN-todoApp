import '@/styles/globals.css'
import Layout from '@/components/layout'
import { HandlersProvider } from "../context/clientHandlers.js"
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} basePath='https://check-todo-app.vercel.app/api/auth'>
      <HandlersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HandlersProvider>
    </SessionProvider>
  )
}

export default MyApp
