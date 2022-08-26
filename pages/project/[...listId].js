import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";
import { useRouter } from 'next/router';

export default function ClientTasks({ tasks }) {
  const { query } = useRouter();
  const listIndex = Number(query.listId[0]);
  return (
    <>
      {
        tasks && tasks.map((task, index) => {
          return (
            <Tasks infoProps={{ ...task, taskIndex: index, listIndex }} key={index} />
          )
        })
      }
      < NewTask />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`http://localhost:3000/api/server/projectTasks/${params.listId[1]}`)
  const data = await response.json()
  return {
    props: {
      tasks: data[0].tasks
    }
  }
}
