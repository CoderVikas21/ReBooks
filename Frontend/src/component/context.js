import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Provider Component..this is container for shared data and functions
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
