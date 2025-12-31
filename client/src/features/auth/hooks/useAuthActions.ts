import { useApi } from "@/hooks";
import { extractErrorCodeKeys, renderErrorToast } from "@/utils/error";
import {
  passwordFormSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { z } from "zod";
export const useAuthActions = () => {
  const api = useApi();

  const { mutateAsync: updatePassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: async (form: z.infer<typeof passwordFormSchema>) => {
        const promise = new Promise((resolve, reject) => {
          try {
            const parsedPasswordForm = passwordFormSchema.strip().parse(form);
            resolve(
              api.patch("/auth/update-password", {
                passwordForm: parsedPasswordForm,
              })
            );
          } catch (e) {
            reject(e);
          }
        });

        await toast.promise(promise, {
          loading: t("auth.update_password.loading"),
          success: t("auth.update_password.success"),
          error: (err: unknown) => extractErrorCodeKeys(err),
        });
        return await promise;
      },
    });

  const { mutateAsync: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: async (form: z.infer<typeof signInFormSchema>) => {
      const promise = new Promise((resolve, reject) => {
        try {
          const signInForm = signInFormSchema.strip().parse(form);
          resolve(api.post("/auth/sign-in", { signInForm }));
        } catch (e) {
          reject(e);
        }
      });

      await toast.promise(promise, {
        loading: t("auth.signin.loading"),
        success: t("auth.signin.success"),
        error: (err: unknown) => extractErrorCodeKeys(err),
      });
      return await promise;
    },
  });

  const { mutateAsync: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async () => {
      const promise = api.post("/auth/sign-out");
      await toast.promise(promise, {
        loading: t("auth.signout.loading"),
        success: t("auth.signout.success"),
        error: (err: unknown) => extractErrorCodeKeys(err),
      });
      return await promise;
    },
  });

  const { mutateAsync: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: async (form: z.infer<typeof signUpFormSchema>) => {
      const promise = new Promise((resolve, reject) => {
        try{ 
 const signUpForm = signUpFormSchema.strip().parse(form);
 resolve(  api.post("/auth/sign-up", { signUpForm }))
        }catch(e){
          reject(e);
        }
      })

      await toast.promise(promise, {
        loading: t("auth.signup.loading"),
        success: t("auth.signup.success"),
        error: (err: unknown) => extractErrorCodeKeys(err)
      })
      return await promise;
    },

  });

  return {
    updatePassword,
    isUpdatingPassword,
    signIn,
    isSigningIn,
    signOut,
    signUp,
    isSigningUp,
    isSigningOut,
  };
};
