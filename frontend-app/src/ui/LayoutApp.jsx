import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAutthenticated } from "../hooks/useAuth";

function LayoutApp() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function isLogin() {
      const isAuth = await isAutthenticated();

      if (!isAuth) {
        navigate("/login");
      }
    }

    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      isLogin();
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
export default LayoutApp;
