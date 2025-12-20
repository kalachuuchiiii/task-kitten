
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "./useSession";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils";
import { extractErrorMessage } from "@/utils/error";


export const useSignOut = () => {
    const { clearSession } = useSession();
    const nav = useNavigate();

    const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async() => {
      const p = API.post('/auth/sign-out')
      toast.promise(p, {
        loading: 'Signing you out...',
        success: 'Signed out successfully!',
        error: (err) => extractErrorMessage(err)
      })
      return await p;
    },
    onSuccess: () => {
      clearSession();
      nav('/sign-in');
    }
  }) 

  return {
    signOut,
    isSigningOut,
  };

}