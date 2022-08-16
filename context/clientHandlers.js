import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// Context is designed to share "READ ONLY" data that can be considered “global”
// for a tree of React components, thus DO NOT relay on states while running logic functions 
// remember on Hard reload ' Refresh ' things will be init again!!!

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const { query } = useRouter();
  const [tasks, setTasks] = useState(null);

  const updateTasks = async () => {
    try {
      const req = await fetch(`/api/server/${query.listId}`);
      const resData = await req.json();
      setTasks(resData)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    < ClientContext.Provider value={{
      tasks,
      updateTasks
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }

/*
 *  const req = await fetch(`http://localhost:3000/api/server/${query.listId}`);
 *  const resData = await req.json();
*/

// const clientInfo = resData.filter(client => client['client_email'] === session.user.email);
// useEffect( [query.listId]);

