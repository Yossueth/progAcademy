import React, { useState } from "react";
import AcademyContext from "./AcademyContext";
import { jwtDecode } from "jwt-js-decode";

const AcademyProvider = ({ children }) => {
  const tokenEnciptado = sessionStorage.getItem("token");

  const token = jwtDecode(tokenEnciptado);

  return (
    <AcademyContext.Provider value={{ token }}>
      {children}
    </AcademyContext.Provider>
  );
};

export default AcademyProvider;
