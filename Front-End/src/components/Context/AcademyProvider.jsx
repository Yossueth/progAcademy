import React, { useState } from "react";
import AcademyContext from "./AcademyContext";
import { jwtDecode } from "jwt-js-decode";

const AcademyProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (rol) => {
    setUser(rol);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AcademyContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AcademyContext.Provider>
  );
};

export default AcademyProvider;
