import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // GET USER FROM LOCAL STORAGE
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // LOGIN
  const login = (userData) => {
    setUser(userData);

    // SAVE USER
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    // REMOVE USER
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);