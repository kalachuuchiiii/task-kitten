
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "./useSession";
import { useNavigate } from "react-router-dom";
import { API, extractSuccessMessage } from "@/utils";
import { extractErrorMessage } from "@/utils/error";
import { useTranslation } from "react-i18next";


export const useSignOut = () => {
    const { clearSession } = useSession();
    const nav = useNavigate();
    const { t } = useTranslation();

    const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async() => {
      const p = API.post('/auth/sign-out')
      toast.promise(p, {
        loading: t('auth.signout.loading'),
        success: t('auth.signout.success'),
        error: extractErrorMessage,
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