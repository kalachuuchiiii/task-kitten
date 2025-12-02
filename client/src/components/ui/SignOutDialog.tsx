import { useSession, useSignOut } from "@/features/auth";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { LinkPlaceholder } from "./LinkPlaceholder";
import { LogOut } from "lucide-react";
import { Separator } from "./separator";

export const SignOutDialog = () => {
  const { signOut, isSigningOut } = useSignOut();
  const { isLookingForSession, user } = useSession();

  if (isLookingForSession || !user) {
    return <LinkPlaceholder />;
  }

  return (
    <div className="flex items-center gap-2 ">
      <LogOut className="text-red-600 " />
      <Separator orientation="vertical" />
      <Dialog>
        <DialogTrigger className="p-2 w-full h-full text-left ">
          Sign Out
        </DialogTrigger>
        <DialogContent>
          <DialogTitle> Sign out of your account?</DialogTitle>
          <DialogDescription>You will need to sign back in.</DialogDescription>
          <div className="flex gap-2 justify-end">
            <DialogClose>
              <Button className="button-bg">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => signOut()}
              disabled={isSigningOut}
              variant={"secondary"}
            >
              Sign out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
