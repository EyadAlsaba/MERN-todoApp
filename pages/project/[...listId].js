import { useRouter } from 'next/router';
import Tasks from '@/components/tasks.js'
import NewTask from "@/components/newTask";
import findListTasks from '@/server/projectTasks/[getTasksList]'
import { useEffect } from 'react';

export default function ClientTasks({ tasks }) {
  // I need to reload the page whenever  this component mount (tasks changed/added)!
  const { query } = useRouter();
  const listIndex = Number(query.listId[0]);

  return (
    <>
      {
        tasks && tasks.map((task, index) => {
          return (
            <Tasks taskProps={{ ...task, taskIndex: index, listIndex }} key={index} />
          )
        })
      }
      < NewTask />
    </>
  )
}

export async function getServerSideProps({ params }) {
  const response = await findListTasks(params.listId[1]);
  const docs = JSON.parse(response);
  return {
    props: {
      tasks: docs.client_lists[0].tasks
    }
  }
}