import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ClientContext } from '@/context/clientHandlers';
import { useSession } from 'next-auth/react';
import Tasks from '@/components/tasks'
import NewTask from '@/components/newTask';
import Loading from '@/components/Spinner';

export default function ClientTasks() {
  const { data: session } = useSession({ required: true });
  const { query } = useRouter();
  const isQueryExist = Object.hasOwn(query, "listId")
  const [loading, setLoading] = useState(true);
  const { todos, getTodos } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      if (isQueryExist) {
        await getTodos(query.listId[1]);
        setLoading(false);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      {
        todos.length !== 0 ?
          todos.map((task, index) => {
            return (
              <Tasks taskProps={{ ...task, taskIndex: index, listIndex: query.listId[0] }} key={index} />
            )
          }) :
          loading && <Loading />
      }
      {!loading && <NewTask />}
    </>
  )
}
