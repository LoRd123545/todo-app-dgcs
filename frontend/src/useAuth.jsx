import React, { useState, useEffect, useRef } from "react";
import client from "./keycloak.js";

localStorage.setItem("keycloakInitialized", false);

const useAuth = () => {
  useEffect(() => {
    if (localStorage.getItem("keycloakInitialized") === "true") return;

    localStorage.setItem("keycloakInitialized", true);
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {})
      .catch((err) => {
        console.error("keycloak initialization error: " + err);
      });
  }, []);

  return [client.authenticated, client];
};

export default useAuth;
