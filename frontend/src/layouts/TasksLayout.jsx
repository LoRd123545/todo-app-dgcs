import { Outlet } from "react-router-dom";
import { useKeycloak } from "keycloak-react-web";
import keycloak from "../keycloak.js";
import useAuth from "../useAuth.jsx";

function TasksLayout() {
  useAuth();

  keycloak.onTokenExpired = () => {
    console.log("Token expired!");
    keycloak.updateToken(30);
  };

  return <Outlet />;
}

export default TasksLayout;
