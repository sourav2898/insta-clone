import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "../Loaders/Fallback";
import { Toaster } from "../../../@/components/ui/toaster";

const RootLayout = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <Suspense fallback={<Fallback />}>
        <Outlet />
        <Toaster />
      </Suspense>
    </div>
  );
};

export default RootLayout;
