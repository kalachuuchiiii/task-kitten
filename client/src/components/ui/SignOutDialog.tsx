import { useAuthActions, useSession } from "@/features/auth";
import { Button } from "./button";
import { LinkPlaceholder } from "./LinkPlaceholder";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./alert-dialog";
import { useNavigate } from "react-router-dom";

export const SignOutDialog = () => {
  const { signOut, isSigningOut } = useAuthActions();
  const { isLookingForSession, user, clearSession } = useSession();
  const nav = useNavigate();

  const handleSignOut = async () => {
    await signOut().then(() => {
      nav("/sign-in");
      clearSession();
    });
  };

  if (isLookingForSession || !user) {
    return <LinkPlaceholder />;
  }

  return (
    <AlertDialogContent>
      <AlertDialogTitle> Sign out of your account?</AlertDialogTitle>
      <AlertDialogDescription>
        You will need to sign back in.
      </AlertDialogDescription>
      <div className="flex gap-2 justify-end">
        <AlertDialogCancel className="w-fit button-bg">
          Cancel
        </AlertDialogCancel>
        <Button
          onClick={handleSignOut}
          disabled={isSigningOut}
          variant={"secondary"}
        >
          Sign out
        </Button>
      </div>
    </AlertDialogContent>
  );
};
