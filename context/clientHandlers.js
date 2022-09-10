import { createContext, useState } from "react";
import { useSession } from "next-auth/react";

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);

  const createClientProfile = async () => {
    await fetch('/api/server/app/clientInstance', {
      body: JSON.stringify({
        'email': session.user.email
      }),
      headers: { "Content-Type": "application/json" },
      method: 'POST'
    })
  }

  const getTodos = async (listId) => {
    const requestDocs = await fetch(`/api/server/projectTasks/${listId}`);
    const docs = await requestDocs.json();
    setTodos(docs.client_lists[0].tasks);
  }

  const addNewTask = async ({ taskTitle, query }) => {
    const newTaskAdded = await fetch('/api/server/projectTasks/newTask', {
      method: 'POST',
      body: JSON.stringify({ taskTitle, listId: query.listId }),
      headers: { 'Content-Type': 'application/json' }
    });
    const isAdded = await newTaskAdded.json();
    const newTasks = isAdded.client_lists[query.listId[0]].tasks
    setTodos([...newTasks]);
  }

  const deleteTask = async (taskId) => {
    await fetch('/api/server/projectTasks/deleteTask', {
      method: 'DELETE',
      body: JSON.stringify({ taskId }),
      headers: { 'Content-Type': 'application/json' }
    });
    return true
  }

  const updateTask = async (date, note, priority, taskId, listIndex, taskIndex) => {
    await fetch('/api/server/projectTasks/updateTask', {
      method: 'PUT',
      body: JSON.stringify({ date, note, priority, taskId, listIndex, taskIndex }),
      headers: { 'Content-Type': 'application/json' }
    });
    return true
  };

  return (
    < ClientContext.Provider value={{
      addNewTask,
      deleteTask,
      updateTask,
      createClientProfile,
      todos,
      getTodos
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }
