import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { TasksList } from "src/components/TasksList";
import taskService from "src/services/tasks";
import { useTasks, useTasksUpdate } from "../../contexts/TasksContext";

const Index = () => {
  const tasks = useTasks();
  const setTasks = useTasksUpdate();

  const [networkError, setNetworkError] = useState(false);
  const keycloak = useOutletContext();

  const handleDelete = (id, token) => {
    taskService.remove(id, token);
    const tasksCopy = tasks;

    const result = tasksCopy.filter((task) => {
      return task._id !== id;
    });

    setTasks(result);
  };

  useEffect(() => {
    taskService
      .get(keycloak.token)
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
