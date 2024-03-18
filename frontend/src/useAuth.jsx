import React, { useState, useEffect, useRef, useCallback } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak("/keycloak.json");

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  const init = useCallback(client.init);

  useEffect(() => {
    console.log(isRun.current);

    if (isRun.current) return;

    isRun.current = true;

    console.log("inside function");

    // try {
    //   const res = client.init({
    //     onLoad: "login-required",
    //   });

    //   setLogin(res);
    //   setToken(client.res);
    // } catch (err) {
    //   console.log(err);
    // }
    init({
      onLoad: "check-sso",
    }).then((res) => {
      setLogin(res);
      setToken(client.token);
    });
  }, [token]);

  console.log("outside function");
  //console.log(client.token);

  return [isLogin, token];
};

export default useAuth;
