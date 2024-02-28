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

  // useEffect(() => {
  //   fetch('http://host.docker.internal:9000')
  // }, []);

  /*
  Fetching tasks - not working

  fetch("http://localhost:3000/tasks", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6bEd0bjRDOFA1UnhyeUNJbWRya1h1YXhSQVZkYWthemRzVzJWV2J5cjhjIn0.eyJleHAiOjE3MDg3OTkzMjksImlhdCI6MTcwODc5OTAyOSwianRpIjoiNzdjYTVmODUtNmRkOC00YjRmLWFjYTMtZmRjYzA5NGIyNmJlIiwiaXNzIjoiaHR0cDovL2hvc3QuZG9ja2VyLmludGVybmFsOjkwMDAvcmVhbG1zL2RlbW8iLCJhdWQiOlsiY2xpZW50MSIsInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6ImVhNzVmYmQ1LTlkMjctNDIxNi1iZTQxLWVjNTZiODJmMWM4YyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNsaWVudDEiLCJzZXNzaW9uX3N0YXRlIjoiMjNmODIzMjYtYWY5Ni00ODcxLWJmMTctNTk0ZDcwNGRmNGY0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWRlbW8iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImNsaWVudDEiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZ29vZC1zZXJ2aWNlIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIyM2Y4MjMyNi1hZjk2LTQ4NzEtYmYxNy01OTRkNzA0ZGY0ZjQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.HwZIOOrZVO2sH8lGHI_lKooCxYpcsRj0HEhTNBeZJJUeE0wjkhUmmUXKtflRNvWdhWVxLFRJuACd5tZRNHf6bBBe1ayMv-XdfQtkbjOWtcJsMkqWfHeB1IrlMa8Nw7JYRhd53Knq5Nyti_FxvnJaYmUcU2l-JI8WEGlvj9aZUu_iwlRukz5kxUmodzFbl06gOU1nU5dSfKup6UDY358rp9NZde2coI5P9NKEXtIcFKBdJmDxc2KB20jxH_uRBLqeqxT1IY4vlWQCFQjo7_sphqrLEL54sSmVxrhWJQOEbbP6FHehej9RXN0Y-1E9_82YTav_KsniueRJ5nmWgyC89w",
    },
  })
    .then((res) => res.json())
    .then((tasks) => setTasks(tasks.data))
    .catch((err) => console.log(err));

  */

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
