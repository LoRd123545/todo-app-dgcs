import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext";

function Logout() {
  const keycloak = useAuth();

  useEffect(() => {
    if (keycloak.authenticated === true) keycloak.logout();
  }, [keycloak]);

  return <Navigate to="/" />;
}

export default Logout;
