import useAuth from "../useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDelete() {
  const [tasks, setTasks] = useState();
  const [isLogin, keycloak] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = keycloak.token;

  useEffect(() => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("error while deleting task: " + err);
      });

    navigate("/tasks");
  }, [token, tasks]);

  return <></>;
}

export default TaskDelete;
