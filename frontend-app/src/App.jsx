import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";

import { router } from "./Router.jsx";

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
