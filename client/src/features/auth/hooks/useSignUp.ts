import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { SignUpForm } from "../types/auth.types";
import { API } from "@/utils";
import { signUpFormSchema } from "@shared/schema";
import { renderErrorToast } from "@/utils/error";
import { useTranslation } from "react-i18next";

export const useSignUp = () => {

  const [form, setForm] = useState<SignUpForm>({
    password: '',
    username: '',
    confirmPassword: ''
  })
  const { t } = useTranslation();

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setForm((prev) => ({
    ...prev,
    [name]: value
   }))
  }

  const { mutate: handleSignUp, isPending } = useMutation({
    mutationFn: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const signUpForm = signUpFormSchema.strip().parse(form);
      const p = API.post('/auth/sign-up', { signUpForm });
      await toast.promise(p, {
        loading: t('auth.signup.loading'),
        success: t('auth.signup.success')
      }); 
      return await p;
    },
    onError: renderErrorToast
  });

  return {
    handleChangeForm,
    handleSignUp,
    isCreatingAccount: isPending,
    form
  }

}