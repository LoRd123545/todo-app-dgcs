import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "src/components/Modal";

const Task = (props) => {
  const handleClick = () => {
    props.deleteHandler(props.id, props.token);
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="task">
        <Link to={props.id} className="task__heading">
          {props.name}
        </Link>
        <br />
        <span className="task__text">{props.status}</span>
        <span className="task__text">{props.dueDate}</span>
        <div className="task__icons">
          <button className="task__button--decoration-none">
            <Link to={`${props.id}/edit`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
          </button>
          <button className="task__button--decoration-none">
            {/* <Link to={`${props.id}/delete`}>
              <FontAwesomeIcon icon={faTrash} />
            </Link> */}
            <FontAwesomeIcon icon={faTrash} onClick={() => setIsOpen(true)} />
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div>Czy napewno chcesz usunąć to zadanie?</div>
            <button onClick={handleClick}>tak</button>
            <button onClick={() => setIsOpen(false)}>nie</button>
          </Modal>
        </div>
      </div>
    </>
  );
};

export { Task };
