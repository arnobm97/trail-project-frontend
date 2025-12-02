import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import NavBar from "../pages/shared/NavBar/NavBar";

const Main = () => {
  const location = useLocation();

  // Routes where we DON'T want the main navbar/footer
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("user/dashboard") ||
    location.pathname.includes("admin/dashboard");

  return (
    <div>
      {noHeaderFooter || <NavBar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
