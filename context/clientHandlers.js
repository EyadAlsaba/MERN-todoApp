import { createContext } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
/*
 * Context is designed to share "READ ONLY" data that can be considered “global”
 * for a tree of React components, thus DO NOT relay on states while running logic functions 
 * remember on Hard reload ' Refresh ' things will be init again!!!
 * functions defined here will communicate with the server, where server will handle the database OP.
*/

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();
  // ----------------------------------------------------------- testing
  const [clientDataBase, setDataBase] = useState([]);

  const gettingClientsData = async () => {
    const response = await fetch(`http://localhost:3000/api/server/app`)
    const responseResolve = await response.json();
    if (session) {
      const clientLists = responseResolve.filter(client => client.client_email === session.user.email)[0].client_lists;
      setDataBase(clientLists)
      return {
        props: {
          clientLists
        }
      }
    }
  }

  const addNewTask = async ({ taskTitle, query }) => {
    try {
      const res = await fetch('http://localhost:3000/api/server/projectTasks/newTask', {
        method: 'POST',
        body: JSON.stringify({ taskTitle, listId: query.listId }),
        headers: { 'Content-Type': 'application/json' }
      });
      await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch('http://localhost:3000/api/server/projectTasks/deleteTask', {
        method: 'DELETE',
        body: JSON.stringify({ taskId }),
        headers: { 'Content-Type': 'application/json' }
      });
      await res.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    < ClientContext.Provider value={{
      addNewTask,
      deleteTask,
      gettingClientsData
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }



