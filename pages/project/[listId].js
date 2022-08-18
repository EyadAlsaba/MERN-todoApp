// import { useContext, useEffect, useState } from "react";
import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";
// url query can be exposed by useRouter hook
// import { ClientContext } from '@/context/clientHandlers.js';

export default function ClientTasks({ docs }) {

  return (
    <>
      {
        !docs ? <h3 style={{ margin: '5rem' }}>No Tasks to display</h3> :
          docs.map((doc, index) => {
            return (
              <Tasks {...doc} key={index} />
            )
          })
      }
      <NewTask />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/api/server/projectTasks/${params.listId}`)
  const response = await request.json();
  const { docs } = response;
  return {
    props: {
      docs
    }
  }
}