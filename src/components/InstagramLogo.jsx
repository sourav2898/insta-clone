// @ts-nocheck
import React from "react";
import instagramLogo from "../assets/instagram-logo.png";

const InstagramLogo = ({ width = 250, height = 250, ...props }) => {
  return <img src={instagramLogo} width={width} height={height} {...props} />;
};

export default InstagramLogo;
