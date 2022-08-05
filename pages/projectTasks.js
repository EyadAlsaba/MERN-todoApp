import Tasks from '@/components/tasks.js'
import { useContext } from "react";
import { ClientContext } from '@/context/clientHandlers.js';

export default function ClientTasks() {
  const { client } = useContext(ClientContext);
  console.log(client)
  return (
    <>
      <Tasks list={client['client_lists']} />
    </>
  )
}