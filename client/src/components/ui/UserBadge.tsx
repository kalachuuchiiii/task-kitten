import type { User } from "@/types/User";
import { Avatar } from "./avatar";


export const UserBadge = ({ user, avatarSize = 10 }: {user: User, avatarSize: number;}) => {
  return (
    <div className="flex items-center  gap-4">
      <Avatar size={avatarSize} src={user.avatar} />
      <div className="">
        <p className="">{user.nickname ?? user.username}</p>
      </div>
    </div>
  );
}