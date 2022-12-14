import { VscChromeClose, VscMenu } from 'react-icons/vsc'
import { BsCheck2Circle } from 'react-icons/bs'
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'

function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  function toggle() {
    const navLinks = document.getElementById('links');
    setOpen(!open);
    navLinks.classList.toggle(`${styles.active}`);
  };

  return (
    <nav className={styles.navbar} >
      <div className={styles.brand}>
        <Link href='/'>
          <span>
            check
            <BsCheck2Circle />
          </span>
        </Link>
      </div>
      <button className={styles.btn} type='button' onClick={() => toggle()}>
        {
          open ? <VscChromeClose /> : <VscMenu />
        }
      </button>
      <div className={styles.links} id='links'>
        <ul>
          <li onClick={() => toggle()}>
            <Link href='/projects'>projects</Link></li>
          <li onClick={() => toggle()}>
            <Link href='/about'>about</Link></li>
          <li onClick={() => {
            status === 'authenticated' ? signOut() : signIn();
            toggle()
          }}>
            <Link href='/auth/signIn'>{session ? 'log out' : 'log in'}</Link></li>
        </ul>
      </div>
    </nav >
  )
}

export default Navbar;
