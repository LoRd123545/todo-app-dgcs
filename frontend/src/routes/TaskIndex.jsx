import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import axios from "axios";
import useAuth from "../useAuth";

function TaskIndex() {
  const [tasks, setTasks] = useState([]);

  const [authenticated, keycloak] = useAuth();
  const token = keycloak.token;

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks", {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        } else {
          console.log("unauthorized");
          setTasks([]);
        }
        console.log(res.status);
      })
      .catch((err) => {
        console.error("err: " + err);
      });
  }, [token]);

  return authenticated ? (
    <>
      <div className="container">
        <h1 className="heading">Twoje zadania</h1>
        <br />
        <br />
        <Link to="add" className="button">
          Nowe Zadanie
        </Link>
        <div className="select container__select">
          <select name="filtr" id="filtr">
            <option value="">Wybierz</option>
            <option value="/tasks">Wszystkie</option>
            <option value="/tasks?status=done">Zakończone</option>
            <option value="/tasks?status=in-progress">W trakcie</option>
            <option value="/tasks?status=not-started">Do zrobienia</option>
          </select>
        </div>
        <br />
        <br />
        {tasks.map((task) => {
          return (
            <Task
              key={task._id}
              id={task._id}
              name={task.name}
              status={task.status}
              completion_date={task.dueDate}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default TaskIndex;
