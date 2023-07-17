import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user,setUser] = useState(null);
  const [initialusers,setInitialusers] = useState([]);
  const [detailview, setDetailview] = useState("userview");
  const [collectors,setCollectors] = useState([]);
  const contextValue = {
    user,
    collectors,
    setCollectors,
    initialusers,
    setInitialusers,
    detailview,
    setDetailview,
    selectUser: (user) => setUser({...user})
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };