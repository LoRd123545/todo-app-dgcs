import { Task } from "src/components/Task";
import { useTasksUpdate, useTasks } from "src/contexts/TasksContext";

const TasksList = ({ tasks, token, deleteHandler }) => {
  return tasks.map((task) => {
    return (
      <Task
        key={task._id}
        id={task._id}
        name={task.name}
        status={task.status}
        dueDate={task.dueDate}
        token={token}
        deleteHandler={deleteHandler}
      />
    );
  });
};

export { TasksList };
