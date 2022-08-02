/* eslint-disable @next/next/no-img-element */
import Styles from '@/styles/Welcome.module.css'
export default function Welcome({ user }) {

  const { name, email, image } = user;
  return (
    <section className={Styles.section}>
      <h4 className={Styles.name}>welcome, {name}</h4>
      <img src={image} alt='user image' className={Styles.img} />
      <p className={Styles.para}>{email}</p>
      <div>
        <p className={Styles.para}>you can start organize your projects by clicking on projects</p>
      </div>
    </section>
  )
}