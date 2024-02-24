import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "../public/stylesheets/main.css";

import Root from "./routes/Root";
import Faq from "./routes/Faq";
import About from "./routes/About";
import PageNotFound from "./routes/PageNotFound.jsx";
import TaskIndex from "./routes/TaskIndex.jsx";
import TaskAdd from "./routes/TaskAdd.jsx";

//Layouts
import RootLayout from "./layouts/RootLayout.jsx";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3000");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Root />} />
      <Route path="faq" element={<Faq />} />
      <Route path="about" element={<About />} />
      <Route path="tasks" element={<TaskIndex />} />
      <Route path="tasks/add" element={<TaskAdd />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  // for tests
  useEffect(() => {
    socket.on("error", (err) => {
      console.error(err);
    });
    socket.on("task-expired", (data) => {
      console.log(
        `${data.username}'s task with id = ${data.taskID} has just expired!`
      );
    });
  }, [socket]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
