import type { JSX } from "react";
import { motion } from "framer-motion";
import SignInPage from "@/features/auth/pages/SignInPage";
import { useSession } from "@/features/auth/hooks";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLookingForSession, user } = useSession();

  const isAuthorized = isAuthenticated && !isLookingForSession && user !== null;

  return (
    <>
      {isAuthorized ? (
        children
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
          className="w-full z-20 backdrop-blur-xs flex flex-col items-center justify-center fixed inset-0"
        >
          <div className="p-4 h-[90%] bg-neutral-50 max-w-xl w-full rounded-xl shadow-xl outline-1 space-y-8 outline-black/20">
            <p className="text-4xl text-center font-bold tracking-tighter my-10">
              Sign in to access this page
            </p>
            <SignInPage />
          </div>
        </motion.div>
      )}
    </>
  );
};
