import { Link } from "react-router-dom";

//Need to import fontawesome icons because the delete and edit icons aren't showing up

function Task(props) {
  return (
    <>
      <div className="task">
        <Link to={props.id} className="task__heading">
          {props.name}
        </Link>
        <br />
        <span className="task__text">{props.status}</span>
        <span className="task__text">{props.completion_date}</span>
      </div>
      <div className="task__icons">
        <button className="task__button--decoration-none">
          <Link to="{props.id}/edit">
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </button>
        <form action="/tasks/<%= tasks[i].id %>?_method=DELETE" method="post">
          <button className="task__button--decoration-none">
            <i class="fa-solid fa-trash"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default Task;
