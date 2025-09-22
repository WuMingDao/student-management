import { Outlet } from "react-router";
import NavBar from "./NavBar";
import ToolBar from "./ToolBar";

function Home() {
  return (
    <>
      <NavBar />
      <ToolBar />

      <Outlet />
    </>
  );
}
export default Home;
