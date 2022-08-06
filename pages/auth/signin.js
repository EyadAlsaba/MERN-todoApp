import { getSession, getProviders, signIn } from "next-auth/react"
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { useRouter } from "next/router"
import Styles from '@/styles/Signin.module.css'

export default function SignIn({ providers }) {
  const { query } = useRouter();

  return (
    <>
      <section className={Styles.sectionContainer}>
        {
          query.error === 'SessionRequired' ?
            <div className={Styles.errorMsg}>
              <span>
                please signin to access your projects
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
  const providers = await getProviders()
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { providers },
  }
}
