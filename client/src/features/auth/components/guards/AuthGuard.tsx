
import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useSession } from "@/features/auth/hooks/useSession";
import SignInPage from "@/features/auth/pages/SignInPage";
import type { JSX } from "react";


export const AuthGuard = ({children} : {children: JSX.Element}) => {

    const { isAuthenticated, isLookingForSession, user } = useSession();

    if(isLookingForSession){
        return <LoadingDisplay />;
    }

    const isAuthorized = isAuthenticated && !isLookingForSession && user !== null;

    return (
      <>
        {isAuthorized ? (
          children
        ) : (
          <div className="w-full flex flex-col items-center justify-center fixed inset-0">
            <div className="p-4 h-[90%] max-w-xl w-full rounded-xl outline-1 space-y-8 outline-black/20 shadow-md">
              <p className="text-4xl text-center font-bold tracking-tighter my-10">Sign in to access this page</p>
              <SignInPage />
            </div>
          </div>
        )}
      </>
    );
}