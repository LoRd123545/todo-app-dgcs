import {
  //createBrowserRouter,
  //createRoutesFromElements,
  Route,
  //RouterProvider,
  Routes,
  //Router,
} from "react-router-dom";
import io from "socket.io-client";
import { useEffect } from "react";

// routes
import Root from "./routes/Root";
import Faq from "./routes/Faq";
import About from "./routes/About";
import PageNotFound from "./routes/PageNotFound.jsx";
import TaskIndex from "./routes/TaskIndex.jsx";
import TaskAdd from "./routes/TaskAdd.jsx";
import TaskEdit from "./routes/TaskEdit.jsx";
import TaskView from "./routes/TaskView.jsx";
import TaskDelete from "./routes/TaskDelete.jsx";

// layouts
import RootLayout from "./layouts/RootLayout.jsx";
import TasksLayout from "./layouts/TasksLayout.jsx";

// styles
import "../public/stylesheets/main.css";

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
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Root />} />
          <Route path="faq" element={<Faq />} />
          <Route path="about" element={<About />} />
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
    </>
  );
}

export default App;
