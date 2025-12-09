import { useSession, useSignOut } from "@/features/auth";
import { Button } from "./button";
import { LinkPlaceholder } from "./LinkPlaceholder";
import { LogOut } from "lucide-react";
import { Separator } from "./separator";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";

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
      <AlertDialog>
        <AlertDialogTrigger className="p-2 w-full h-full text-left ">
          Sign Out
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle> Sign out of your account?</AlertDialogTitle>
          <AlertDialogDescription>You will need to sign back in.</AlertDialogDescription>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel  className="w-fit button-bg">
             Cancel
            </AlertDialogCancel>
            <Button
            className=""
              onClick={() => signOut()}
              disabled={isSigningOut}
              variant={"secondary"}
            >
              Sign out
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
