import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { Toaster } from "sonner";
import Home from "./ui/Home";
import ScoreList from "./features/score/ScoreList";
import StudentList from "./features/student/StudentList";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import NotFound from "./ui/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/home/score" />} />

          <Route path="home" element={<Home />}>
            <Route path="score" element={<ScoreList />} />

            <Route path="student" element={<StudentList />} />
          </Route>

          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <DevTools />

      <Toaster />
    </>
  );
}
export default App;
