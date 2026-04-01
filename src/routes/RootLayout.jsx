import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { TransactionProvider } from "../contexts/TransactionContext";

const RootLayout = () => {
  return (
    <TransactionProvider>
      <Navbar />
      <main className="theme-page pt-16">
        <Outlet />
      </main>
    </TransactionProvider>
  );
};

export default RootLayout;
