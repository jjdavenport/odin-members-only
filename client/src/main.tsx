import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  MessagePage,
  AdminPage,
  NewMessagePage,
} from "./pages/pages.tsx";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "message/:id",
        element: <MessagePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "new-message",
        element: <NewMessagePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
