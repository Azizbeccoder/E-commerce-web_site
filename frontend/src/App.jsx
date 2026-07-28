import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Footer from "./components/Footer";

const App = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme="light"
      />

      <Navigation />

      <main className="flex-1">
        <Outlet />
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

export default App;
