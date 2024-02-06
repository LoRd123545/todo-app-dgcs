import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import "../public/stylesheets/main.css";

import Root from "./routes/Root";
import Faq from "./routes/Faq";

//Layouts
import RootLayout from "./layouts/RootLayout.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<Root />} />
      <Route path="faq" element={<Faq/ >} />
    </Route>
  )
  
);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
