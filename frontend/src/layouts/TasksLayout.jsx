import { Outlet } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext.jsx";
import { useEffect } from "react";
import { socket } from "src/data/socket.js";
import { TasksProvider } from "src/contexts/TasksContext";

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

  return (
    <TasksProvider>
      <Outlet context={keycloak} />;
    </TasksProvider>
  );
}

export default TasksLayout;
