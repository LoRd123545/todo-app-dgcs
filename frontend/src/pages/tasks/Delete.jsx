import { useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import taskService from "src/services/tasks";

const Delete = () => {
  const keycloak = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = keycloak.token;

  useEffect(() => {
    taskService
      .remove(id, token)
      .then((res) => {
        navigate("/tasks");
      })
      .catch((err) => {
        console.error("error while deleting task: " + err);
      });
  }, [token]);

  return <></>;
};

export default Delete;
