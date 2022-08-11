import { createContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

//Context is designed to share "READ ONLY" data that can be considered “global” for a tree of React components
const ClientContext = createContext();

const HandlersProvider = ({ children }) => {

  const [client, setClient] = useState([]);

  useEffect(() => async () => {
    const session = await getSession();
    if (session) {
      const req = await fetch('http://localhost:3000/api/server/app');
      const resData = await req.json();
      if (resData) {
        const clientInfo = resData.filter(client => client['client_email'] === session.user.email);
        setClient(clientInfo);
      } else {
        setClient({ msg: 'could not fetch the data for this particular client' });
      }
    }
  }, []);

  return (
    < ClientContext.Provider value={{
      client
    }}>
      {children}
    </ClientContext.Provider >
  )
}

export { ClientContext, HandlersProvider }