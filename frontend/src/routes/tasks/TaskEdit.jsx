import { axiosInstance } from "src/axios.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function TaskEdit() {
  const [task, setTask] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const keycloak = useOutletContext();
  const token = keycloak.token;

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setTask(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    const newData = { ...task };
    newData[e.target.name] = e.target.value;
    setTask(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      name: task.name || e.target.name.value,
      description: task.description || e.target.description.value,
      dueDate: task.dueDate || e.target.dueDate.value,
      status: task.status || e.target.status.value,
    };
    setTask(updatedTask);
    axiosInstance
      .patch(
        `http://localhost:3000/tasks/${id}`,
        {
          name: updatedTask.name,
          dueDate: updatedTask.dueDate,
          description: updatedTask.description,
          status: updatedTask.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        console.log(updatedTask);
        console.log(data.data);
        navigate("/tasks");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="form__panel">
      <div className="form__header">
        <h1 className="heading text--white ">Edytuj</h1>
      </div>
      <div className="form__box">
        <form onSubmit={handleSubmit}>
          <label>
            <div className="wrapper">
              <div className="input-data">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={task.name}
                  onChange={handleChange}
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
                  value={task.description}
                  onChange={handleChange}
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
                  name="dueDate"
                  step="1"
                  id="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
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
                  value={task.status}
                  onChange={handleChange}
                >
                  <option value="not-started" selected>
                    Do zrobienia
                  </option>
                  <option value="in-progress">W trakcie</option>
                  <option value="done">Zakończone</option>
                </select>
              </div>
            </div>
            <br />
          </label>
          <div className="wrapper wrapper__button">
            <button type="submit" className="button">
              Edytuj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEdit;
