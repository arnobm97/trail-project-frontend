import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import AuthProviders from "./providers/AuthProviders";
import {
  QueryClient,
  QueryClientProvider,

} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-7xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>
);
