import React, { useState, useEffect, useRef } from "react";
import client from "./keycloak.js";

//const client = new Keycloak("/keycloak.json");
localStorage.setItem("keycloakInitialized", false);

const useAuth = () => {
  //const isRun = useRef(0);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    //console.log(isRun.current);

    //if (isRun.current > 0) return;
    //console.log(typeof localStorage.getItem("keycloakInitialized") === "true");
    //debugger;
    if (localStorage.getItem("keycloakInitialized") === "true") return;

    localStorage.setItem("keycloakInitialized", true);
    //isRun.current++;

    // async () => {
    //   try {
    //     const res = await client.init({
    //       onLoad: "login-required",
    //     });

    //     setLogin(res);
    //     setToken(client.token);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    //console.log("run");
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
        //console.log("successfully initialized keycloak!");
      });

    return () => {
      console.log("destroyed");
    };
  }, []);

  return [isLogin, client.token];
};

export default useAuth;
