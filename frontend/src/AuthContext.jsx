import React, { useState, useEffect, useContext } from "react";
import client from "./keycloak.js";

const AuthContext = React.createContext(client);

localStorage.setItem("keycloakInitialized", false);

export const AuthProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(client);

  return (
    <AuthContext.Provider value={keycloak}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const keycloak = useContext(AuthContext);

  useEffect(() => {
    console.log("updated state: " + keycloak.token);

    if (localStorage.getItem("keycloakInitialized") === "true") return;

    localStorage.setItem("keycloakInitialized", true);

    console.log("started initializing keycloak!");

    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        console.log("initialized keycloak: " + keycloak.token);
      })
      .catch((err) => {
        console.error("keycloak initialization error: " + err);
      });
  }, [keycloak]);

  return keycloak;
};
