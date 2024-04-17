import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Task from "src/components/Task.jsx";
import { axiosInstance } from "src/axios.js";

function TaskIndex() {
  const [tasks, setTasks] = useState([]);

  const [networkError, setNetworkError] = useState(false);
  const keycloak = useOutletContext();

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/tasks", {
        headers: {
          Authorization: "Bearer " + keycloak.token,
        },
        withCredentials: false,
      })
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        }
      })
      .catch((err) => {
        setNetworkError(true);
        console.error("err: " + err);
      });
  }, [keycloak]);

  if (networkError) {
    return (
      <div>It looks like our backend is not responding. Try again later!</div>
    );
  }

  return keycloak.authenticated ? (
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
