import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";

export default function ClientTasks({ data }) {
  const { client_lists } = data;
  return (
    <>
      {
        client_lists && client_lists[0].tasks.map((task, index) => {
          console.log()
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
  const response = await fetch(`http://localhost:3000/api/server/projectTasks/${params.listId}`)
  const data = await response.json()
  return {
    props: {
      data
    }
  }
}
