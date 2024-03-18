import {
  //createBrowserRouter,
  //createRoutesFromElements,
  Route,
  //RouterProvider,
  Routes,
  //Router,
} from "react-router-dom";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";

// routes
import Root from "./routes/Root";
import Faq from "./routes/Faq";
import About from "./routes/About";
import PageNotFound from "./routes/PageNotFound.jsx";
import TaskIndex from "./routes/TaskIndex.jsx";
import TaskAdd from "./routes/TaskAdd.jsx";
import TaskEdit from "./routes/TaskEdit.jsx";

// layouts
import RootLayout from "./layouts/RootLayout.jsx";
import TasksLayout from "./layouts/TasksLayout.jsx";

// styles
import "../public/stylesheets/main.css";

import useAuth from "./useAuth.jsx";

const socket = io("http://localhost:3000");

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Root />} />
//       <Route path="faq" element={<Faq />} />
//       <Route path="about" element={<About />} />
//       <Route path="tasks">
//         <Route index element={TaskIndex}></Route>
//         <Route path="add" element={TaskAdd}></Route>
//         <Route path=":id/edit" element={TaskEdit}></Route>
//       </Route>
//       <Route path="*" element={<PageNotFound />} />
//     </Route>
//   )
// );

//const keycloak = new Keycloak("/keycloak.json");

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

  // const keycloak = new Keycloak("/keycloak.json");

  // const initialized = useRef(false);

  // useEffect(() => {
  //   if (initialized.current) {
  //     return;
  //   }

  //   initialized.current = true;

  //   keycloak.init({
  //     onLoad: "login-required",
  //   });
  // }, []);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Root />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
          <Route path="tasks" element={<TasksLayout />}>
            <Route index element={<TaskIndex />}></Route>
            <Route path="add" element={<TaskAdd />}></Route>
            <Route path=":id/edit" element={<TaskEdit />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
