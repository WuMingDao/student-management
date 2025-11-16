import { Outlet } from "react-router";
import ToolBar from "./ToolBar";

function HomeLayoutWithToolbar() {
  return (
    <>
      <ToolBar />
      <Outlet />
    </>
  );
}
export default HomeLayoutWithToolbar;
