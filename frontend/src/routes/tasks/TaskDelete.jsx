import { axiosInstance } from "src/axios.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

function TaskDelete() {
  const [tasks, setTasks] = useState();
  const keycloak = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = keycloak.token;

  useEffect(() => {
    axiosInstance
      .delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        navigate("/tasks");
      })
      .catch((err) => {
        console.error("error while deleting task: " + err);
      });
  }, [token]);

  return <></>;
}

export default TaskDelete;
