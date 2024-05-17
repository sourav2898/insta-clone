import React from "react";
import { cn } from "@/lib/utils";

const ErrorTag = ({ className, text }) => {
  return <p className={cn("text-red-400", className)}> {text} </p>;
};

export default ErrorTag;
