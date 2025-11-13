import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";

import ScoreList from "./features/score/ScoreList.jsx";
import ScoreUpload from "./features/score/ScoreUpload.jsx";
import ScoreUpdate from "./features/score/ScoreUpdate.jsx";

import StudentList from "./features/stduent/StudentList.jsx";
import StudentEdit from "./features/stduent/StudentEdit.jsx";
import StudentCreate from "./features/stduent/StudentCreate.jsx";

import Login from "./features/auth/Login.jsx";
import Signup from "./features/auth/Signup.jsx";

import Profile from "./features/user/Profile.jsx";

import LayoutApp from "./ui/LayoutApp.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./ui/NotFound.jsx";
import { router } from "./Router.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <DevTools />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutApp />}>
            <Route index element={<Navigate to="/home/score" />} />

            <Route path="home" element={<Home />}>
              <Route index element={<Navigate to="/home/score" />} />
              <Route path="score">
                <Route index element={<ScoreList />} />
                <Route path=":id" element={<ScoreUpdate />} />
                <Route path="upload" element={<ScoreUpload />} />
              </Route>

              <Route path="student">
                <Route index element={<StudentList />} />
                <Route path=":id" element={<StudentEdit />} />
                <Route path="create" element={<StudentCreate />} />
              </Route>

              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}
    </QueryClientProvider>
  );
}
export default App;
