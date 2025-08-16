import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Pagination from "./Pagination.jsx";

function LayoutApp() {
  return (
    <>
      <Outlet />
    </>
  );
}
export default LayoutApp;
