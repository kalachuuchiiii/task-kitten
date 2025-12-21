import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSession } from "@/features/auth";
import type { TextChangeEvent } from "@/features/planners/todo-task";
import { useState } from "react";
import { useAccountActions } from "../hooks";
import { USER_LIMIT } from "@shared/limits";

export const UsernameFormSheet = () => {
  const { user } = useSession();
  const [username, setUsername] = useState<string>('');
  const handleChangeUsername = (e: TextChangeEvent) => setUsername(e.target.value);
  const { updateUsername, isUpdatingUsername } = useAccountActions(); 

  return (
    <SheetContent className="p-3">
      <SheetHeader>
        <SheetTitle>Change Username</SheetTitle>
        <SheetDescription>You can only change your username once every 14 days.</SheetDescription>
      </SheetHeader>

      <main>
        <InputGroup>
          <InputGroupText className="pl-2">Username</InputGroupText>
          <InputGroupInput maxLength={USER_LIMIT.username.MAX} onChange={handleChangeUsername} placeholder={user?.username} />
        </InputGroup>
      </main>

      <button
      onClick={() => updateUsername(username)}
      disabled = {isUpdatingUsername}
       className="button-bg w-full p-1.5">Update</button>
    </SheetContent>
  );
};
