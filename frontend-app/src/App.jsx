import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import ScoreList from "./features/score/ScoreList.jsx";
import ScoreUpdate from "./features/score/ScoreUpdate.jsx";
import ScoreUpload from "./features/score/ScoreUpload.jsx";

import StudentCreate from "./features/stduent/StudentCreate.jsx";
import StudentEdit from "./features/stduent/StudentEdit.jsx";
import StudentList from "./features/stduent/StudentList.jsx";

import Login from "./features/auth/Login.jsx";
import Signup from "./features/auth/Signup.jsx";

import Profile from "./features/user/Profile.jsx";

import Home from "./pages/Home.jsx";
import LayoutApp from "./ui/LayoutApp.jsx";
import NotFound from "./ui/NotFound.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <DevTools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;
