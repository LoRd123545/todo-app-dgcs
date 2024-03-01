import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";

function TaskIndex() {
  //showing tasks is working - these are tasks made for tests
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "jeden",
      status: "not-started",
      completion_date: "12-02-2024",
    },
    {
      id: "2",
      name: "dwa",
      status: "in-progress",
      completion_date: "15-03-2024",
    },
  ]);

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
