import { createContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const ClientContext = createContext();

const HandlersProvider = ({ children }) => {

  const [client, setClient] = useState([]);

  useEffect(() => {
    return async () => {
      const session = await getSession();
      if (session) {
        const req = await fetch('http://localhost:3000/api/server/app');
        const reqData = await req.json();
        const clientInfo = reqData.filter(client => client['client_email'] === session.user.email)

        if (clientInfo) {
          setClient(...clientInfo)
        } else {
          setClient({ msg: 'could not fetch the data for the particular client' })
        }
      }

    }
  }, [])


  return (
    < ClientContext.Provider value={{
      client
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }