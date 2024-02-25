import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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
          <Link to={`${props.id}/edit`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
        </button>
        <form action="/tasks/<%= tasks[i].id %>?_method=DELETE" method="post">
          <button className="task__button--decoration-none">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </form>
      </div>
    </>
  );
}

export default Task;
