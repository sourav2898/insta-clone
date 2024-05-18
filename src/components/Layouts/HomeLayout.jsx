// @ts-nocheck
import {
  Bell,
  CirclePlus,
  Home,
  MapIcon,
  Search,
  Send,
  UserRound,
  Video,
} from "lucide-react";

import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import InstagramLogo from "@/src/components/InstagramLogo";
import { CreatePost } from "../../components/CraetePost";
import { Button } from "../../../@/components/ui/button";
import { useAuth } from "@/src/contexts/authContext";
import { doSignOut } from "@/src/firebase/auth";

const HomeLayout = () => {
  const [create, setCreate] = useState(false);
  const [logginOut, setLogginout] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      setLogginout(true);
      await doSignOut();
    } catch (error) {
      console.error("error while logging out", error);
    } finally {
      setLogginout(false);
    }
  };

  const handleOpen = () => {
    setCreate(!create);
  };

  console.log(currentUser);

  return (
    <div className="w-full h-full flex">
      <div className="hidden border-r border-gray-500 md:block w-[240px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center p-10 lg:h-[60px] lg:px-6">
            <InstagramLogo width={150} height={150} className="text-white" />
          </div>
          <div className="flex-1">
            <nav className="grid gap-1 items-start px-2 font-medium lg:px-4">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <Search className="h-5 w-5" />
                Search
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <MapIcon className="h-5 w-5" />
                Explore
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <Video className="h-5 w-5" />
                Rels
              </Link>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <Send className="h-5 w-5" />
                Message
              </Link>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <Bell className="h-5 w-5" />
                Notification
              </Link>

              <p
                className="flex items-center cursor-pointer gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
                onClick={handleOpen}
              >
                <CirclePlus className="h-5 w-5" />
                Create
              </p>

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:bg-zinc-800 text-white text-4"
              >
                <UserRound className="h-5 w-5" />
                Profile
              </Link>
            </nav>
          </div>

          {userLoggedIn ? (
            <div className="w-auto p-5">
              <div className="mb-2">
                <p className="font-medium text-white">
                  {currentUser?.displayName}
                </p>
                <p className="text-xs text-muted-foreground text-white ">
                  {currentUser?.email}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleLogout}
                disabled={logginOut}
              >
                {logginOut ? "Logging out..." : "Logout"}
              </Button>
            </div>
          ) : (
            <Button size="sm" className=" m-5" variant="outline" asChiild>
              <Link to="/auth/signin"> Signin </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 w-full h-full overflow-y-auto py-5">
        <div className="w-full lg:w-[800px] m-auto">
          <Outlet />
        </div>
        {create ? (
          <CreatePost open={create} handleOpenChange={handleOpen} />
        ) : null}
      </div>
    </div>
  );
};

export default HomeLayout;
