import { Outlet } from "react-router-dom";

import Header from "src/partials/Header";
import Footer from "src/partials/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
