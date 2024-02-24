import { useState } from "react";
import { Link } from "react-router-dom";
import Task from "../components/Task";

function TaskIndex() {
  fetch("http://localhost:3000/tasks", {
    headers: { Authorization: "Bearer Token" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  const [tasks, setTasks] = useState([
    { id: "1", name: "eloelo", status: "done", completion_date: "1212" },
    { id: "2", name: "dwa", status: "in-progress", completion_date: "5123" },
  ]);

  fetch();
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
          <select name="filtr" id="filtr" onChange="handleSelect(this)">
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
