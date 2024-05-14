import React, { useState, useEffect, useContext } from "react";

const TasksContext = React.createContext([]);
const TasksUpdateContext = React.createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksUpdateContext.Provider value={setTasks}>
        {children}
      </TasksUpdateContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const tasks = useContext(TasksContext);

  return tasks;
};

export const useTasksUpdate = () => {
  const setTasks = useContext(TasksUpdateContext);

  return setTasks;
};
