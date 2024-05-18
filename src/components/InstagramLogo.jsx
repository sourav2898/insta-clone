// @ts-nocheck
import React from "react";
import instagramLogo from "../assets/instagram-logo.png";
import { Link } from "react-router-dom";

const InstagramLogo = ({ width = 250, height = 250, ...props }) => {
  return (
    <Link to="/">
      {" "}
      <img src={instagramLogo} width={width} height={height} {...props} />{" "}
    </Link>
  );
};

export default InstagramLogo;
