import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Logout() {
  const [authenticated, keycloak] = useAuth();

  useEffect(() => {
    if (keycloak.authenticated === true) keycloak.logout();
  }, [keycloak]);

  return <Navigate to="/" />;
}

export default Logout;
