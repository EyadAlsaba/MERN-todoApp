import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";
/*
  * import { useContext, useEffect, useState } from "react";
  * url query can be exposed by useRouter hook
  * import { ClientContext } from '@/context/clientHandlers.js';
*/
export default function ClientTasks({ docs }) {
  const { tasks } = docs[0]
  return (
    <>
      {
        tasks && tasks.map((task, index) => {
          return (
            <Tasks {...task} key={index} />
          )
        })
      }
      < NewTask />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/api/server/projectTasks/${params.listId}`)
  const response = await request.json();
  const docs = response.docs.client_lists.filter(item => item._id === params.listId)
  return {
    props: {
      docs
    }
  }
}
