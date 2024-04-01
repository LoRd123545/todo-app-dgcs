import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../useAuth.jsx";

function TasksLayout() {
  const [authenticated, keycloak] = useAuth();

  keycloak.onTokenExpired = () => {
    console.log("Token expired!");
    keycloak.updateToken(30);
  };

  return (
    <>
      {/* <Navigate to="/tasks" /> */}
      <Outlet />
    </>
  );
}

export default TasksLayout;
