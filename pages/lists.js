import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaPlusCircle } from 'react-icons/fa'
import Styles from "@/styles/Lists.module.css"
import ListForm from "@/components/listForm";
import DeleteList from "@/components/listDeleteForm";
import Head from "next/head";
import Link from "next/link";



export default function Projects({ clientLists }) {

  const { data: session } = useSession({ required: true });

  const showModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  };

  useEffect(() => {

    const handler = (e) => {
      const modal = document.getElementById('modal');
      if (e.target.id === 'modal') {
        modal.style.display = 'none';
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler)
    }
  });


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

                  <Link href={`/${list['list_title']}`}>
                    <a className={Styles.listTitle}>
                      {list['list_title']}
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
          <ListForm clientId={session.user.email} />

        </section>
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const clientInfo = await getSession(context);

  if (clientInfo) {
    const request = await fetch(`http://localhost:3000/api/server/getLists`)
    const data = await request.json();
    const clientLists = data.filter(client => client.clientId === clientInfo.user.email);
    return {
      props: {
        clientLists
      }
    }
  };

  return {
    props: {
      clientLists: []
    }
  }
}


/*

*/