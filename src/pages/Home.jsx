// @ts-nocheck
import { ChevronLeft, ChevronRight } from "lucide-react";
import InstagramPost from "../components/Post";
import React, { useEffect, useState } from "react";
import Story from "../components/Story";
import stories from "@/src/utils/stories";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import SkeletonPost from "@/src/components/Loaders/SkeletonPost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.post.timestamp - a.post.timestamp);
      setPosts(postsData);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className=" w-full h-full">
      <div className="w-full flex items-center space-x-4 overflow-x-auto p-4 mb-5 ">
        <div className=" w-full flex items-center justify-between space-x-4">
          {stories.map((story, index) => (
            <Story key={index} username={story.username} image={story.image} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonPost key={index} />
            ))
          : posts.map((item) => (
              <InstagramPost
                key={item.id}
                username={item?.post?.usename}
                email={item?.post?.email}
                caption={item?.post?.caption}
                imageUrl={item?.post?.imageUrl}
                id={item.id}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
