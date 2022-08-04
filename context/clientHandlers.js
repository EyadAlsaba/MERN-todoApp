import { createContext, useState } from "react";
import { getSession } from "next-auth/react";

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  const newClient = async () => {
    const session = await getSession();
    setClients(JSON.stringify(session, null, 2))
  }

  return (
    < ClientContext.Provider value={{
      newClient
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }