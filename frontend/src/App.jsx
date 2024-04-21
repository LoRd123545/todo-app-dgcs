// packages
import { Route, Routes } from "react-router-dom";

// React
import React, { useEffect, useState } from "react";

// others
import { socket } from "./data/socket.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// routes
import Root from "./pages/Root";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound.jsx";
import TasksIndex from "./pages/tasks/Index.jsx";
import TaskView from "./pages/tasks/View.jsx";
import TasksAdd from "./pages/tasks/Add.jsx";
import TaskEdit from "./pages/tasks/Edit.jsx";
import TaskDelete from "./pages/tasks/Delete.jsx";

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
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Root />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
          <Route path="logout" element={<Logout />} />
          <Route path="tasks" element={<TasksLayout />}>
            <Route index element={<TasksIndex />}></Route>
            <Route path=":id" element={<TaskView />}></Route>
            <Route path="add" element={<TasksAdd />}></Route>
            <Route path=":id/edit" element={<TaskEdit />}></Route>
            <Route path=":id/delete" element={<TaskDelete />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
