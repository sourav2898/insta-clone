// @ts-nocheck
import { ChevronLeft, ChevronRight } from "lucide-react";
import InstagramPost from "../components/Post";
import React from "react";
import Story from "../components/Story";
import stories from "@/src/utils/stories";

const Home = () => {
  return (
    <div className=" w-full h-full">
      <div className="w-full flex items-center space-x-4 overflow-x-auto p-4 mb-5 ">
        <div className=" w-full flex items-center justify-between space-x-4">
          {/* <button className="flex items-center justify-center bg-transparent">
            <ChevronLeft className="text-white" size={24} />
          </button> */}
          {stories.map((story, index) => (
            <Story key={index} username={story.username} image={story.image} />
          ))}
          {/* <button className="flex items-center justify-center bg-transparent">
            <ChevronRight className="text-white" size={24} />
          </button> */}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <InstagramPost />

        <InstagramPost />

        <InstagramPost />

        <InstagramPost />

        <InstagramPost />

        <InstagramPost />
      </div>
    </div>
  );
};

export default Home;
