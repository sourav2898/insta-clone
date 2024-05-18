// @ts-nocheck
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../@/components/ui/avatar";

const Story = ({ username, image }) => (
  <div className="flex flex-col items-center space-y-2">
    <Avatar className="border-2 border-red-400">
      <AvatarImage src={image} alt={username} size="lg" />
      <AvatarFallback s>{username.charAt(0)}</AvatarFallback>
    </Avatar>
    <p className="text-white text-sm">{username}</p>
  </div>
);

export default Story;
