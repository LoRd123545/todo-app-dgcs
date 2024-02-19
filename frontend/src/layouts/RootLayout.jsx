import {Outlet, NavLink} from "react-router-dom";

import Header from "../partials/Header";
import Footer from "../partials/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}