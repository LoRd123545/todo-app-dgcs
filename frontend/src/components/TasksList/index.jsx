import { Task } from "src/components/Task";

const TasksList = ({ tasks }) => {
  return tasks.map((task) => {
    return (
      <Task
        key={task._id}
        id={task._id}
        name={task.name}
        status={task.status}
        dueDate={task.dueDate}
      />
    );
  });
};

export { TasksList };
