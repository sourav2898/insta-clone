// @ts-nocheck
import React from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./components/Layouts/Root";
import { Suspense } from "react";
import Fallback from "./components/Loaders/Fallback";
import UnAuthLayout from "./components/Layouts/UnAuth";
import ErrorPage from "./pages/Error";
import { AuthProvider } from "@/src/contexts/authContext";
import HomeLayout from "@/src/components/Layouts/HomeLayout";

const Home = React.lazy(() => import("./pages/Home"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Signup = React.lazy(() => import("./pages/Signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "auth",
        element: <UnAuthLayout />,
        children: [
          { index: true, element: <Navigate to="/auth/signin" replace /> },
          {
            path: "signin",
            element: <Signin />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          { path: "*", element: <Navigate to="/auth/signin" replace /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
