import { createContext } from "react";
import { useSession } from "next-auth/react";

/*
 * Context is designed to share "READ ONLY" data that can be considered “global”
 * for a tree of React components, thus DO NOT relay on states while running logic functions 
 * remember on Hard reload ' Refresh ' things will be init again!!!
 * functions defined here will communicate with the server, where server will handle the database OP.
*/

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();

  const addNewTask = async ({ taskTitle, query }) => {
    // console.log(taskTitle, query.listId)
    try {
      const res = await fetch('http://localhost:3000/api/server/projectTasks/newTask', {
        method: 'POST',
        body: JSON.stringify({ taskTitle, client_email: session.user.email, listId: query.listId }),
        headers: { 'Content-Type': 'application/json' }
      });
      await res.json()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    < ClientContext.Provider value={{
      addNewTask
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }

/*
 *  const req = await fetch(`http://localhost:3000/api/server/${query.listId}`);
 *  const resData = await req.json();
 * const clientInfo = resData.filter(client => client['client_email'] === session.user.email);
*/


