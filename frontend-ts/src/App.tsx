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
import CreateStudent from "./features/student/CreateStudent";
import EditStudent from "./features/student/EditStudent";
import EditScore from "./features/score/EditScore";
import UploadScore from "./features/score/UploadScore";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/home/score" />} />

          <Route path="home" element={<Home />}>
            <Route path="score">
              <Route index element={<ScoreList />} />
              <Route path=":id" element={<EditScore />} />
              <Route path="upload" element={<UploadScore />} />
            </Route>

            <Route path="student">
              <Route index element={<StudentList />} />
              <Route path=":id" element={<EditStudent />} />
              <Route path="create" element={<CreateStudent />} />
            </Route>
          </Route>

          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <DevTools />

      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
export default App;
