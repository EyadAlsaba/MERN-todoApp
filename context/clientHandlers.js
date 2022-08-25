import { createContext } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();

  const createClientProfile = async () => {
    const res = await fetch(`http://localhost:3000/api/server/app/${session.user.email}`);
    const clientExists = await res.json();
    if (!clientExists) {
      await fetch('http://localhost:3000/api/server/app/clientInstance', {
        body: JSON.stringify({
          'email': session.user.email
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST'
      })
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
      await fetch('http://localhost:3000/api/server/projectTasks/deleteTask', {
        method: 'DELETE',
        body: JSON.stringify({ taskId }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (date, note, priority, taskId) => {
    try {
      const doc = await fetch('/api/server/projectTasks/updateTask', {
        method: 'PUT',
        body: JSON.stringify({ date, note, priority, taskId }),
        headers: { 'Content-Type': 'application/json' }
      });
      await doc.json()
    } catch (error) {
      console.log('context error', error)
    }
  };

  return (
    < ClientContext.Provider value={{
      addNewTask,
      deleteTask,
      updateTask,
      createClientProfile
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }
