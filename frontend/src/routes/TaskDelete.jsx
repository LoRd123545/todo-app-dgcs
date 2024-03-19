import useAuth from "../useAuth";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TaskDelete() {
  const [isLogin, token] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.error("error while deleting task: " + err);
      });

    navigate("/tasks");
  }, [token]);

  return <></>;
}

export default TaskDelete;
