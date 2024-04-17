import { Outlet } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext.jsx";
import { useEffect } from "react";
import { socket } from "src/socket.js";

function TasksLayout() {
  const keycloak = useAuth();

  useEffect(() => {
    if (keycloak.authenticated) {
      socket.connect();
      socket.emit("user-data", {
        username: keycloak.idTokenParsed.preferred_username,
      });
      console.log("socket io connected");
    }

    keycloak.onTokenExpired = () => {
      console.log("Token expired!");
      keycloak.updateToken(30);
    };
  }, []);

  return <Outlet context={keycloak} />;
}

export default TasksLayout;
