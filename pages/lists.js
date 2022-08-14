import { useSession, getSession } from "next-auth/react";
import { useContext, useState, useEffect } from "react";
import { ClientContext } from '@/context/clientHandlers.js';
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

    const modal = document.getElementById('modal');
    const check = document.querySelector('input[type="checkBox"]');
    console.log(check)
    const handler = (e) => {
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
 * This page aimed to display all the lists the user have!
 * Each list is clickable,when it's click,we open new page with all the projects listed in!
 * We should provide the user with tool to create new list (like button with + symbol)
 * To create new instance of list schema the follow must be provided "list_title, clientId,tasks"
 * when user click on + we open new model and user must provide the title of the list   
 * we send new request to file uses the clientList schema to create new instance !!
*/

/*

*/