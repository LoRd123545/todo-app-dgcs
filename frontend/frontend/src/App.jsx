import { createBrowserRouter, createRoutesFromElements, Router, Route, RouterProvider} from 'react-router-dom';
import "../public/stylesheets/main.css";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Root from "./routes/root";
import io from "socket.io-client";
import { useEffect } from 'react';

const socket = io.connect("http://localhost:3000");


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);


function App() {
  // for tests
  useEffect(() => {
    socket.on('task-expired', data => {
      console.log(`${data.username}'s task with id = ${data.taskID} has just expired!`);
    });
  }, [socket]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
