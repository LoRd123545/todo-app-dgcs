function TaskAdd() {
  return (
    <div className="form__panel">
      <div className="form__header">
        <h1 className="heading text--white ">Dodaj zadanie</h1>
      </div>
      <div className="form__box">
        <form action="/tasks/add" method="post">
          <label>
            <div className="wrapper">
              <div className="input-data">
                <input type="text" name="name" />
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
                ></textarea>
                <label>Opis zadania</label>
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Termin wykonania zadania</label>
              <div>
                <input type="datetime-local" name="completion_date" step="1" />
              </div>
            </div>
          </label>
          <label>
            <div className="wrapper">
              <label>Status zadania</label>
              <div className="select">
                <select name="status" id="status">
                  <option value="not-started">Do zrobienia</option>
                  <option value="in-progress">W trakcie</option>
                  <option value="done">Zakończone</option>
                </select>
              </div>
            </div>
            <br />
          </label>
          <div className="wrapper wrapper__button">
            <button className="button">Dodaj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskAdd;
