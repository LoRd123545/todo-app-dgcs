import { useEffect, useState } from "react";
import { Task } from "src/components/Task";
import { useOutletContext, useParams } from "react-router-dom";
import taskService from "src/services/tasks";

const View = () => {
  const keycloak = useOutletContext();
  const [task, setTask] = useState({});
  const { id } = useParams();
  const token = keycloak.token;

  useEffect(() => {
    taskService
      .getOne(id, token)
      .then((res) => {
        console.log(res.data);
        setTask(res.data);
      })
      .catch((err) => {
        console.error("error while fetching single task: " + err);
      });
  }, []);

  return (
    <Task
      key={task._id}
      id={task._id}
      name={task.name}
      dueDate={task.dueDate}
      status={task.status}
    />
  );
};

export default View;
