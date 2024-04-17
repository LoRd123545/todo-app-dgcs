// packages
import { Route, Routes } from "react-router-dom";

// React
import React, { useEffect, useState } from "react";

// others
import { socket } from "./socket.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// routes
import Root from "./routes/Root";
import Logout from "./routes/Logout";
import Faq from "./routes/Faq";
import About from "./routes/About";
import PageNotFound from "./routes/PageNotFound.jsx";
import TaskIndex from "./routes/tasks/TaskIndex.jsx";
import TaskAdd from "./routes/tasks/TaskAdd.jsx";
import TaskEdit from "./routes/tasks/TaskEdit.jsx";
import TaskView from "./routes/tasks/TaskView.jsx";
import TaskDelete from "./routes/tasks/TaskDelete.jsx";

// layouts
import RootLayout from "./layouts/RootLayout.jsx";
import TasksLayout from "./layouts/TasksLayout.jsx";

// styles
import "../public/stylesheets/main.css";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log(isConnected);
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log(isConnected);
    };

    const onFooEvent = (value) => {
      setFooEvents((previous) => [...previous, value]);
      console.log(value);
      alert(
        value.username +
          "'s task with id " +
          value.taskID +
          " has just expired!"
      );
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("task-expired", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("task-expired", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Root />} />
            <Route path="faq" element={<Faq />} />
            <Route path="about" element={<About />} />
            <Route path="logout" element={<Logout />} />
            <Route path="tasks" element={<TasksLayout />}>
              <Route index element={<TaskIndex />}></Route>
              <Route path=":id" element={<TaskView />}></Route>
              <Route path="add" element={<TaskAdd />}></Route>
              <Route path=":id/edit" element={<TaskEdit />}></Route>
              <Route path=":id/delete" element={<TaskDelete />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
