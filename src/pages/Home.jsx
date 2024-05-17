// @ts-nocheck
import React from "react";
import instagramIcon from "../assets/instagram.png";
import instagramLogo from "../assets/instagram-logo.png";
import { Button } from "../../@/components/ui/button";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();

  const handleLogout = async () => {
    await doSignOut();
  };

  return (
    <div className="bg-black">
      <img width="100px" className="logo" src={instagramIcon} alt="Instagram" />
      <img width="100px" className="logo" src={instagramLogo} alt="Instagram" />
      {userLoggedIn && (
        <Button variant="outline" onClick={handleLogout}>
          {" "}
          Logout{" "}
        </Button>
      )}
    </div>
  );
};

export default Home;
