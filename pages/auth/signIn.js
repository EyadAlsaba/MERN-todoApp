import { getSession, getProviders, signIn } from "next-auth/react"
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { useRouter } from "next/router"
import Styles from '@/styles/SignIn.module.css'

export default function SignIn({ providers }) {
  const { query } = useRouter();

  return (
    <>
      <section className={Styles.sectionContainer}>
        {
          query.error === 'SessionRequired' ?
            <div className={Styles.errorMsg}>
              <span>
                please SignIn to access your projects
              </span>
            </div>
            : null
        }
        <div className={Styles.provider}>
          <button onClick={() => signIn(providers.google.id)} className={Styles.btn}>
            Sign in with google
            <AiFillGoogleCircle />
          </button>
        </div>
        <div className={Styles.provider}>
          <button onClick={() => signIn(providers.github.id)} className={Styles.btn}>
            Sign in with gitHub
            <AiFillGithub />
          </button>
        </div>

      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  /*
  * https://next-auth.js.org/getting-started/client#getproviders
  * providers holding value of null
  *  see context O props in the components console with react tool extension.
 */
  const providers = await getProviders(context)
  const session = await getSession(context);
  console.log(providers, session)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { providers }
  }
}
