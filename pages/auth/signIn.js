import { getProviders, signIn } from "next-auth/react"
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
          <button onClick={() => signIn(providers.google.id, { callbackUrl: `/` })} className={Styles.btn}>
            Sign in with google
            <AiFillGoogleCircle />
          </button>
        </div>
        <div className={Styles.provider}>
          <button onClick={() => signIn(providers.github.id, { callbackUrl: `/` })} className={Styles.btn}>
            Sign in with gitHub
            <AiFillGithub />
          </button>
        </div>

      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}
