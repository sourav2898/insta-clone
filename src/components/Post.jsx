// @ts-nocheck
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../@/components/ui/avatar";
import { Button } from "../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../@/components/ui/card";
import { Separator } from "../../@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import {
  Ellipsis,
  Heart,
  MessageCircle,
  Send,
  SendHorizonal,
} from "lucide-react";
import { Input } from "../../@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { dislikePost, likePost } from "../firebase/actions";
import { useAuth } from "../contexts/authContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const InstagramPost = ({ username, email, imageUrl, caption, id }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsImageLoading(false);
  }, [imageUrl]);

  const isLiked = useMemo(() => {
    return !!likes?.find((like) => like?.userDetails === currentUser?.uid)
      ?.userDetails;
  }, [likes]);

  const handleLike = async () => {
    if (!currentUser) {
      alert("Login Required...");
      return;
    }
    if (isLiked) {
      await dislikePost(id, currentUser?.uid);
    } else {
      await likePost(id, currentUser?.uid);
    }
  };

  useEffect(() => {
    const likesRef = collection(db, `posts/${id}/likes`);
    const commentsRef = collection(db, `posts/${id}/comments`);

    const likesUnsubscribe = onSnapshot(likesRef, (likesSnapshot) => {
      const postLikes = likesSnapshot.docs.map((likeDoc) => likeDoc.data());
      setLikes(postLikes);
    });
    const commentsUnsubscribe = onSnapshot(commentsRef, (commentSnapshot) => {
      const commentLikes = commentSnapshot.docs.map((commentDoc) =>
        commentDoc.data()
      );
      setComments(commentLikes);
    });

    return () => {
      likesUnsubscribe();
      commentsUnsubscribe();
    };
  }, []);

  return (
    <Card className="w-full max-w-lg bg-black ">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{username?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">{username}</p>
              <p className="text-sm text-muted-foreground text-white">
                {email}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-zinc-600">
                <Ellipsis className="text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Delete</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isImageLoading ? (
          <div className="w-full h-[400px] bg-zinc-800 animate-pulse rounded-md"></div>
        ) : (
          <img
            src={imageUrl}
            alt="Post Image"
            className="w-full rounded-md object-contain max-h-[400px]"
          />
        )}
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="hover:bg-transparent"
            >
              <Heart
                className={` ${isLiked ? "fill-red-500" : "text-white"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <MessageCircle className="text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Send className="text-white" />
            </Button>
          </div>
          <div>
            <p className="font-medium text-white mb-1">
              {likes?.length ? `${likes?.length} likes` : null}
            </p>
            <p className="text-sm text-muted-foreground text-white">
              <span className="font-bold">{username}</span> {caption}
            </p>
          </div>

          <div className="w-full">
            <div className="my-4">
              <p className="text-white font-medium">View all 10 comments</p>
              {/* Display comments here */}
            </div>
            <div className="relative w-full flex items-center space-x-2 text-white">
              <Input
                type="text"
                placeholder="Add a comment..."
                className="bg-transparent border-none outline-none w-full focus:outline-none text-sm pr-10"
                value={comment}
                onChange={handleCommentChange}
              />
              {comment?.trim() && (
                <button className="absolute inset-y-0 right-0 flex items-center justify-center bg-transparent">
                  <SendHorizonal className="text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InstagramPost;
