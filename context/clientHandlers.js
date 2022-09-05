import { createContext } from "react";
import { useSession } from "next-auth/react";

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();

  const createClientProfile = async () => {
    await fetch('/api/server/app/clientInstance', {
      body: JSON.stringify({
        'email': session.user.email
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST'
    })
  }

  const addNewTask = async ({ taskTitle, query }) => {
    try {
      const newTaskAdded = await fetch('/api/server/projectTasks/newTask', {
        method: 'POST',
        body: JSON.stringify({ taskTitle, listId: query.listId }),
        headers: { 'Content-Type': 'application/json' }
      });
      return await newTaskAdded.json()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await fetch('/api/server/projectTasks/deleteTask', {
        method: 'DELETE',
        body: JSON.stringify({ taskId }),
        headers: { 'Content-Type': 'application/json' }
      });
      return true
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (date, note, priority, taskId, listIndex, taskIndex) => {

    try {
      await fetch('/api/server/projectTasks/updateTask', {
        method: 'PUT',
        body: JSON.stringify({ date, note, priority, taskId, listIndex, taskIndex }),
        headers: { 'Content-Type': 'application/json' }
      });
      return true
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
