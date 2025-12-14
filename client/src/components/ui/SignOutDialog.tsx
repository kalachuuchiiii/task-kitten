import { useSession, useSignOut } from "@/features/auth";
import { Button } from "./button";
import { LinkPlaceholder } from "./LinkPlaceholder";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./alert-dialog";

export const SignOutDialog = () => {
  const { signOut, isSigningOut } = useSignOut();
  const { isLookingForSession, user } = useSession();

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
          className=""
          onClick={() => signOut()}
          disabled={isSigningOut}
          variant={"secondary"}
        >
          Sign out
        </Button>
      </div>
    </AlertDialogContent>
  );
};
