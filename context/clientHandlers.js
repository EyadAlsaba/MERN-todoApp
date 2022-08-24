import { createContext } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
/*
 * Context is designed to share data that can be considered “global”
 * for a tree of React components, thus DO NOT relay on states while running logic functions 
 * remember on Hard reload ' Refresh ' things will be initiate again!!!
 * functions defined here will communicate with the server, where server will handle the database OP.
*/

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();

  const createClientProfile = async () => {
    const req = await fetch('http://localhost:3000/api/server/app');
    const clientsData = await req.json();

    if (clientsData) {
      const profile = clientsData.some(doc => doc.client_email === session.user.email);

      if (!profile) {
        const newClient = await fetch('http://localhost:3000/api/server/clientInstance', {
          body: JSON.stringify({
            'email': session.user.email
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: 'POST'
        })
        await newClient.json();
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
      createClientProfile
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }
