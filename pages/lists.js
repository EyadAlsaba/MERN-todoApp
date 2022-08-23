import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaPlusCircle } from 'react-icons/fa'
import Styles from "@/styles/Lists.module.css"
import DeleteList from "@/components/listDeleteForm";
import Head from "next/head";
import Link from "next/link";
// -----------------------------------------------------testing
// import { useContext } from "react";
// import { ClientContext } from "@/context/clientHandlers";

export default function Projects({ clientLists }) {
  const { data: session } = useSession({ required: true });
  const [title, setTitle] = useState('');
  const [failed, setFailed] = useState(false);

  // const { gettingClientsData } = useContext(ClientContext);

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
    const response = await fetch('api/server/addList', option);
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

    // const testing = await gettingClientsData();
    // if (testing) {
    //   console.log('testing fire')
    //   console.log(testing)
    // }

    window.addEventListener('click', modalHandler);
    return () => {
      window.removeEventListener('click', modalHandler)
    }
  }, [failed,]);

  if (session) {
    return (
      <>
        <Head>
          <title>projects</title>
        </Head>
        <section className={Styles.section}>
          {
            clientLists && clientLists.map((list, index) => {
              return (
                <div key={index} className={Styles.div}>

                  <Link href={`project/${list._id}`}>
                    <a className={Styles.listTitle}>
                      {list.list_title}
                    </a>
                  </Link>
                  <DeleteList infoProps={{ ...list, index, ...session.user }} />
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
                <label>list title</label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='e.g. events' required autoFocus />
                <button type="submit" className={Styles.formBtn}>add</button>
              </form>
              {
                failed ? <p className={Styles.errMsg}>this title is used</p> : null
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
  const response = await fetch(`http://localhost:3000/api/server/app`)
  const responseResolve = await response.json();
  if (session) {
    const clientLists = responseResolve.filter(client => client.client_email === session.user.email)[0].client_lists
    return {
      props: {
        clientLists
      }
    }
  }
  return {
    props: {
      clientLists: []
    }
  }
};
