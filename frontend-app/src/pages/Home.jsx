import { Outlet } from "react-router";
import Navbar from "../ui/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default Home;
