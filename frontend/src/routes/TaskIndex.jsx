import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import useAuth from "../hooks/useAuth";
import axios from "axios";

function TaskIndex() {
  //showing tasks is working - these are tasks made for tests
  const [tasks, setTasks] = useState([
    {
      id: "dsd",
      name: "dsd",
      completion_date: "12-12-2008",
      status: "gg",
    },
  ]);
  const [isLoggedIn, token] = useAuth();

  axios.defaults.headers.get["Content-Type"] = "application/json";
  axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

  axios
    .get("http://localhost:3000/tasks", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: false,
    })
    .then((res) => {
      console.log(res.data);
      setTasks(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  // fetch(`http://backend:3000/tasks`, {
  //   mode: "cors",
  //   method: "GET",
  // })
  //   .then((response) => response.json())
  //   .then((json) => setTasks(json))
  //   .catch((err) => console.error(err));

  return isLoggedIn ? (
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
              id={task.id}
              name={task.name}
              status={task.status}
              completion_date={task.completion_date}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div>Log in</div>
  );
}

export default TaskIndex;
