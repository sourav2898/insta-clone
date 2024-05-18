// @ts-nocheck
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../@/components/ui/card";

const SkeletonPost = () => {
  return (
    <Card className="w-full max-w-lg bg-black">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
            <div>
              <div className="h-4 bg-zinc-800 rounded w-24 mb-2"></div>
              <div className="h-4 bg-zinc-800 rounded w-20"></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-zinc-800 rounded-full"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] bg-zinc-800 animate-pulse rounded-md"></div>
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
            <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
            <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
          </div>
          <div>
            <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
          </div>
          <div>
            <div className="my-4">
              <div className="h-4 bg-zinc-800 rounded w-full"></div>
            </div>
            <div className="relative flex items-center space-x-2 text-white">
              <div className="w-full bg-zinc-800 rounded"></div>
              <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonPost;
