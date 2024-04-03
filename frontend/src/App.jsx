// packages
import {
  //createBrowserRouter,
  //createRoutesFromElements,
  Route,
  //RouterProvider,
  Routes,
  useNavigate,
  //Router,
} from "react-router-dom";

// React
import React, { useEffect, useState } from "react";

// others
import { socket } from "./socket.js";
import { AuthProvider } from "./AuthContext.jsx";

// routes
import Root from "./routes/Root";
import Logout from "./routes/Logout";
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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onFooEvent = (value) => {
      setFooEvents((previous) => [...previous, value]);
      console.log(value);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
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
