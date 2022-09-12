import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import Styles from "@/styles/Lists.module.css";
import DeleteList from "@/components/listDeleteForm";
import Head from "next/head";
import Link from "next/link";
import getClientLists from '@/server/projectLists/[clientID]';

export default function Lists({ clientLists }) {
  const { data: session } = useSession({ required: true });
  const [title, setTitle] = useState('');
  const [failed, setFailed] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const option = {
      method: 'POST',
      body: JSON.stringify({
        clientEmail: session.user.email,
        list_title: title
      }),
      headers: { 'content-Type': 'application/json' }
    };
    const response = await fetch('api/server/projectLists/addList', option);
    !response.ok ? setFailed(true) : location.reload();
  };

  const showModal = () => { document.getElementById('modal').style.display = 'block' };

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setFailed(false);
        setTitle('');
      }, 3000)
    };

    const modalHandler = (e) => {
      const modal = document.getElementById('modal');
      if (e.target.id === 'modal') {
        modal.style.display = 'none';
      }
    };

    window.addEventListener('click', modalHandler);
    return () => {
      window.removeEventListener('click', modalHandler)
    }
  }, [failed]);

  if (session) {
    return (
      <>
        <Head>
          <title>projects</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <section className={Styles.section}>
          {
            clientLists && clientLists.map((list, index) => {
              return (
                <div key={index} className={Styles.div}>
                  <Link href={`projects/${index}/${list._id}`}>
                    <a className={Styles.listTitle}>
                      {list.list_title}
                    </a>
                  </Link>
                  <DeleteList list={list} />
                </div>
              )
            })
          }
          <div className={Styles.div}>
            <button className={Styles.plus} onClick={() => showModal()}>
              <FaPlusCircle />
            </button>
          </div>
          <div className={Styles.modal} id='modal'>
            <div className={Styles.modalContent}>
              <form onSubmit={submitForm} className={Styles.formContent}>
                <label>title</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='e.g. events' required autoFocus />
                <button type="submit" className={Styles.formBtn}>add</button>
              </form>
              {
                failed && <p className={Styles.errMsg}>this title is used</p>
              }
            </div>
          </div>
        </section>
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const userDocs = await getClientLists(session.user.email);
    const clientLists = JSON.parse(userDocs).client_lists;
    return {
      props: {
        clientLists
      }
    }
  }
  return {
    props: { msg: 'no session ' }
  }
};
