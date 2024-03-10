import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
  const isRunning = useRef(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const client = new Keycloak("/keycloak.json");

    if (isRunning.current) return;

    isRunning.current = true;

    client.init({ onLoad: "login-required" }).then((res) => {
      setIsLoggedIn(res);
      setToken(client.token);
    });
  }, []);

  return [isLoggedIn, token];
};

export default useAuth;
