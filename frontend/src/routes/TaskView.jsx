import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { axiosIntance } from "../axios.js";
import Task from "../components/Task";
import { useParams } from "react-router-dom";

function TaskView() {
  const keycloak = useAuth();
  const [task, setTask] = useState({});
  const { id } = useParams();
  const token = keycloak.token;

  useEffect(() => {
    axiosIntance
      .get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
      })
      .catch((err) => {
        console.error("error while fetching single task: " + err);
      });
  }, [token, task]);

  return (
    <Task
      key={task._id}
      id={task._id}
      name={task.name}
      completion_date={task.dueDate}
      status={task.status}
    />
  );
}

export default TaskView;
