

import type { User } from "@/features/auth/types/auth.types";
import { Avatar } from "./avatar";
import { Skeleton } from "./skeleton";

 const Placeholder = ({ avatarSize }: { avatarSize: number }) => (
   <div className="flex items-center gap-2">
     <Skeleton className={`size-${avatarSize + 2} bg-neutral-200 rounded aspect-square`} />
     <Skeleton className="w-full bg-neutral-200 h-5" />
   </div>
 );



export const UserBadge = ({ user, avatarSize = 10 }: {user: User | null, avatarSize: number;}) => {

 

  if(!user){
    return <Placeholder avatarSize={avatarSize} />;
  }
  return (
    <div className="flex items-center  gap-4">
      <Avatar size={avatarSize} src={user.avatar} />
      <div className="">
        <p className="">{user.nickname ?? user.username}</p>
      </div>
    </div>
  );
}