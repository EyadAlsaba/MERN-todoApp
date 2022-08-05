import { getProviders, signIn } from "next-auth/react"
import Styles from '@/styles/Signin.module.css'
export default function SignIn({ providers }) {

  return (
    <>
      <section className={Styles.sectionContainer}>
        {providers &&
          Object.values(providers).map(provider => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)} >
                Sign in with{' '} {provider.name}
              </button>
            </div>
          ))}
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
