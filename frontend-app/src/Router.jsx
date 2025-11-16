import { createBrowserRouter, Navigate, redirect } from "react-router";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import ScoreList from "./features/score/ScoreList";
import ScoreUpdate from "./features/score/ScoreUpdate";
import ScoreUpload from "./features/score/ScoreUpload";
import StudentCreate from "./features/stduent/StudentCreate";
import StudentEdit from "./features/stduent/StudentEdit";
import StudentList from "./features/stduent/StudentList";
import Profile from "./features/user/Profile";
import { isAutthenticated } from "./hooks/useAuth";
import Home from "./pages/Home";
import LayoutApp from "./ui/LayoutApp";
import NotFound from "./ui/NotFound";

const protectedLoader = async () => {
  const isAuth = await isAutthenticated();
  if (!isAuth) {
    // 如果未认证，返回一个 redirect 响应
    return redirect("/auth/login");
  }
  // 如果已认证，必须返回一些东西，可以是 null 或用户数据
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutApp,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to="/home/score" /> },
      {
        path: "home",
        Component: Home,
        children: [
          {
            path: "score",
            children: [
              { index: true, Component: ScoreList },
              { path: ":id", Component: ScoreUpdate },
              { path: "upload", Component: ScoreUpload },
            ],
          },
          {
            path: "student",
            children: [
              { index: true, Component: StudentList },
              { path: ":id", Component: StudentEdit },
              { path: "create", Component: StudentCreate },
            ],
          },
          {
            path: "profile",
            Component: Profile,
          },
        ],
      },
    ],
  },

  // Auth
  {
    path: "auth",
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },

  // Not found
  {
    path: "*",
    Component: NotFound,
  },
]);
