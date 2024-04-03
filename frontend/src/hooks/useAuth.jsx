import React, { useState, useEffect, useRef } from "react";
import client from "../keycloak.js";

localStorage.setItem("keycloakInitialized", false);

const useAuth = () => {
  const [keycloak, setKeycloak] = useState(client);

  useEffect(() => {
    if (localStorage.getItem("keycloakInitialized") === "true") return;

    localStorage.setItem("keycloakInitialized", true);
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setKeycloak(client);
      })
      .catch((err) => {
        console.error("keycloak initialization error: " + err);
      });
  }, [keycloak]);

  return [keycloak.authenticated, keycloak];
};

export default useAuth;
