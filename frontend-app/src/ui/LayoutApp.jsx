import { useEffect } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router";
import { isAutthenticated } from "../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router";

function LayoutApp() {
  return (
    <>
      <Outlet />
    </>
  );
}
export default LayoutApp;
