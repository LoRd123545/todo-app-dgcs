import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import axios from "axios";
import useAuth from "../useAuth";
import { useKeycloak } from "@react-keycloak/web";

function TaskIndex() {
  const [tasks, setTasks] = useState([]);

  //axios.defaults.headers.get["Content-Type"] = "application/json";
  //axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

  //const [isLogin, token] = useAuth();
  const [initialized, keycloak] = useKeycloak();
  const token = keycloak.token;

  useEffect(() => {
    console.log(token);
    axios
      .get("http://localhost:3000/tasks", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: false,
      })
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // if (!initialized) {
  //   return <p>Loading...</p>;
  // }

  // if (!keycloak.authenticated) {
  //   return <p>Authenticating...</p>;
  // }

  return (
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
              key={task.id}
              id={task.id}
              name={task.name}
              status={task.status}
              completion_date={task.completion_date}
            />
          );
        })}
      </div>
    </>
  );
}

export default TaskIndex;
