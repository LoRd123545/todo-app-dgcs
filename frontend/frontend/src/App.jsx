import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import "../public/stylesheets/main.css";

import Root from "./routes/Root";
import Faq from "./routes/Faq";

//Layouts
import RootLayout from "./layouts/RootLayout.jsx";
import io from "socket.io-client";
import { useEffect } from 'react';

const socket = io.connect("http://localhost:3000");


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<Root />} />
      <Route path="faq" element={<Faq/ >} />
    </Route>
  )
  
);


function App() {
  // for tests
  useEffect(() => {
    socket.on('task-expired', data => {
      console.log(`${data.username}'s task with id = ${data.taskID} has just expired!`);
    });
  }, [socket]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
