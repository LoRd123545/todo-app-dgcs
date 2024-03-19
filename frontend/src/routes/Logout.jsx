import { useEffect } from "react";
import keycloak from "../keycloak.js";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      keycloak.logout();
      navigate("/");
    }

    navigate("../");
  }, []);

  return <></>;
}

export default Logout;
