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
import assets from "../assets";
import { Input } from "../../@/components/ui/input";
import { useState } from "react";

const InstagramPost = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <Card className="w-full max-w-lg bg-black ">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/profile-picture.jpg" alt="Profile Picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-sm text-muted-foreground text-white">
                @johndoe
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
        <img
          src={assets.bruceMars}
          alt="Post Image"
          className="w-full rounded-md object-contain max-h-[400px]"
        />
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
            >
              <Heart className="text-white" />
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
            <p className="font-medium text-white mb-1">1,234 likes</p>
            <p className="text-sm text-muted-foreground text-white">
              <span className="font-bold">John Doe</span> This is a sample
              caption for an Instagram post.This is a sample caption for an
              Instagram post.This is a sample caption for an Instagram post.This
              is a sample caption for an Instagram post.
            </p>
          </div>

          <div>
            <div className="my-4">
              <p className="text-white font-medium">View all 10 comments</p>
              {/* Display comments here */}
            </div>
            <div className="relative flex items-center space-x-2 text-white">
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
