//REFERENCE => https://www.freecodecamp.org/news/how-to-build-a-delightful-loading-screen-in-5-minutes-847991da509f/
import Styles from '@/styles/Spinner.module.css'
export default function Loading() {
  return (
    <section className={Styles.loading}>
      <span className={Styles.loading__author}></span>
      <span className={Styles.loading__anim}></span>
    </section>
  )
}