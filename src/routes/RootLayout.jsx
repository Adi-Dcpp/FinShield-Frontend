import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="theme-page pt-16">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
