import Styles from '@/styles/Footer.module.css'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.container}>
        <div className={Styles.conBox}>
          built with <Link href='https://nextjs.org/'>nextjs</Link>
        </div>
        <div className={Styles.conBox}>
          <ul>
            <li>
              <Link href='/terms'>terms</Link>
            </li>
            <li>
              <Link href='/privacy'>privacy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>

  )
}