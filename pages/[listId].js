import { useContext, useEffect } from "react";
import { ClientContext } from '@/context/clientHandlers.js';
import Tasks from '@/components/tasks.js'

// url query can be exposed by useRouter hook

export default function ClientTasks({ docs }) {
  const { tasks, updateTasks } = useContext(ClientContext);
  useEffect(() => {
    const y = () => {
      return async () => {
        if (tasks === null) {
          console.log('tasks === null');
          const x = await updateTasks();
          console.log(x)
        }
      }
    }

    y()
  }, [tasks, updateTasks])

  return (
    <>
      {
        !docs ? <h5>No Tasks to display</h5> :
          docs.map((doc, index) => {
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

// export async function getServerSideProps({ params }) {
//   const request = await fetch(`http://localhost:3000/api/server/${params.listId}`)
//   const response = await request.json();
//   const { docs } = response;
//   return {
//     props: {
//       docs
//     }
//   }
// }