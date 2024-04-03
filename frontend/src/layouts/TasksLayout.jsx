import { Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

function TasksLayout() {
  const keycloak = useAuth();

  keycloak.onTokenExpired = () => {
    console.log("Token expired!");
    keycloak.updateToken(30);
  };

  return <Outlet />;
}

export default TasksLayout;
