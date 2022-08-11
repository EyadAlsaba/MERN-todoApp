import { useContext } from "react";
import { ClientContext } from '@/context/clientHandlers.js';
import { useRouter } from 'next/router';
import Tasks from '@/components/tasks.js'

export default function ClientTasks({ docs }) {
  const { client } = useContext(ClientContext);
  const router = useRouter();

  return (
    <>
      {/* <h3>testTasksList</h3> */}
      {
        docs && docs.map((doc, index) => {
          return (
            <div key={index}>
              <Tasks list={doc} />
            </div>
          )
        })
      }
    </>
  )
}

export async function getServerSideProps({ params }) {
  const request = await fetch(`http://localhost:3000/api/server/${params.listId}`)
  const response = await request.json();
  const { docs } = response;
  return {
    props: {
      docs
    }
  }
}