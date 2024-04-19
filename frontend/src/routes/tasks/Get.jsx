import { useEffect, useState } from "react";
import { axiosInstance } from "src/data/axios.js";
import { Task } from "src/components/Task";
import { useOutletContext, useParams } from "react-router-dom";

const Get = () => {
  const keycloak = useOutletContext();
  const [task, setTask] = useState({});
  const { id } = useParams();
  const token = keycloak.token;

  useEffect(() => {
    axiosInstance
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
};

export default Get;
