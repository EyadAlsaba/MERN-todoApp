import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";

export default function ClientTasks({ tasks }) {
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
  const response = await fetch(`http://localhost:3000/api/server/projectTasks/${params.listId}`)
  const data = await response.json()
  return {
    props: {
      tasks: data[0].tasks
    }
  }
}
