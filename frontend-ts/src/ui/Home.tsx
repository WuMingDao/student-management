import { Outlet, useLocation } from "react-router";
import NavBar from "./NavBar";
import ToolBar from "./ToolBar";

function Home() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      {(location.pathname === "/home/score" ||
        location.pathname === "/home/student") && <ToolBar />}
      <Outlet />
    </>
  );
}
export default Home;
