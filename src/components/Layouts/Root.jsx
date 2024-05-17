import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "../Loaders/Fallback";

const RootLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-black flex items-center justify-center">
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
