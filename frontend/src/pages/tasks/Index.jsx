import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TasksList } from "src/components/TasksList";
import taskService from "src/services/tasks";
import { useTasks, useTasksUpdate } from "../../contexts/TasksContext";

const Index = () => {
  const tasks = useTasks();
  const setTasks = useTasksUpdate();

  const [status, setStatus] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const keycloak = useOutletContext();
  const [authenticated, setAuthenticated] = useState(keycloak.authenticated);

  const handleDelete = (id, token) => {
    taskService.remove(id, token);
    const tasksCopy = tasks;

    const result = tasksCopy.filter((task) => {
      return task._id !== id;
    });

    setTasks(result);
  };

  useEffect(() => {
    setAuthenticated(keycloak.authenticated);
    console.log("authenticated: " + keycloak.authenticated);
  }, [keycloak.authenticated]);

  useEffect(() => {
    taskService
      .get(keycloak.token, status)
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        }
      })
      .catch((err) => {
        setNetworkError(true);
        console.error("err: " + err);
      });
    console.log(status);
  }, [authenticated, status]);

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
          <select
            name="filtr"
            id="filtr"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Wybierz</option>
            <option value="">Wszystkie</option>
            <option value="done">Zakończone</option>
            <option value="in-progress">W trakcie</option>
            <option value="not-started">Do zrobienia</option>
          </select>
        </div>
        <br />
        <br />
        <TasksList
          tasks={tasks}
          token={keycloak.token}
          deleteHandler={handleDelete}
        />
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Index;
