import { Outlet } from "react-router-dom";
import { useKeycloak } from "keycloak-react-web";

function TasksLayout() {
  return <Outlet />;
}

export default TasksLayout;
