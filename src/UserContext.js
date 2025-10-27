import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setLoggedInUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Optional: if using token-based auth
  };

  return (
    <UserContext.Provider value={{ user, setLoggedInUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
