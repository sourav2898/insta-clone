// @ts-nocheck
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import InstagramLogo from "../InstagramLogo";
import assets from "../../assets";
import { useAuth } from "../../contexts/authContext";

const UnAuth = () => {
  const { userLoggedIn } = useAuth();

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="w-full h-full flex p-5 md:p-10 gap-10">
        <div className="hidden lg:block flex-1">
          <InstagramLogo />
          <div className="w-full h-full flex items-cente gap-10 justify-between">
            <div className="flex flex-col gap-10 justify-center">
              <img
                src={assets.brrokCagle}
                className="rounded-3xl w-[300px] h-[300px] object-cover"
                alt="cagle-img"
              />
              <img
                src={assets.micahelDam}
                className="rounded-3xl w-[400px] h-[400px] object-cover"
                alt="micahel-img"
              />
            </div>
            <div className="flex flex-col gap-10 items-center">
              <img
                src={assets.socialGril}
                className="rounded-3xl w-[250px] h-[250px] object-cover"
                alt="social-gitl-img"
              />
              <img
                src={assets.bruceMars}
                className="rounded-3xl w-[350px] h-[350px] object-cover"
                alt="bruce-mars-img"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="block lg:hidden mb-5">
            <InstagramLogo className="m-auto" />
          </div>
          <div className="flex items-center justify-center md:h-full w-full bg-slate-100 rounded-3xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnAuth;
