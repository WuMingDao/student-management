import { Outlet, useLocation } from "react-router";
import Navbar from "../ui/Navbar";
import ToolBar from "../ui/ToolBar";

function Home() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {(location.pathname === "/home/score" ||
        location.pathname === "/home/student") && <ToolBar />}
      <Outlet />
    </>
  );
}
export default Home;
