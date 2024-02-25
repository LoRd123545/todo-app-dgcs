import { useState } from "react";
import Axios from "axios";

function TaskAdd() {
  const url = "http://localhost:3000/tasks/add";
  const [data, setData] = useState({
    name: "",
    description: "",
    completion_date: "",
    status: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(
      url,
      {
        name: data.name,
        description: data.description,
        completion_date: data.completion_date,
        status: data.status,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res.data);
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <div className="form__panel">
      <div className="form__header">
        <h1 className="heading text--white ">Dodaj zadanie</h1>
      </div>
      <div className="form__box">
        <form onSubmit={(e) => submit(e)}>
          <label>
            <div className="wrapper">
              <div className="input-data">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={(e) => handle(e)}
                />
                <label>Nazwa Zadania</label>
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <div className="textarea-data">
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  maxlength="500"
                  id="description"
                  value={data.description}
                  onChange={(e) => handle(e)}
                ></textarea>
                <label>Opis zadania</label>
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Termin wykonania zadania</label>
              <div>
                <input
                  type="datetime-local"
                  name="completion_date"
                  step="1"
                  id="completion_date"
                  value={data.completion_date}
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Status zadania</label>
              <div className="select">
                <select
                  name="status"
                  id="status"
                  value={data.status}
                  onChange={(e) => handle(e)}
                >
                  <option value="not-started">Do zrobienia</option>
                  <option value="in-progress">W trakcie</option>
                  <option value="done">Zakończone</option>
                </select>
              </div>
            </div>
            <br />
          </label>
          <div className="wrapper wrapper__button">
            <button type="submit" className="button">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskAdd;
