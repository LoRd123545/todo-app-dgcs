import { createBrowserRouter, createRoutesFromElements, Router, Route, RouterProvider} from 'react-router-dom';
import "../public/stylesheets/main.css";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Root from "./routes/root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);


function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
