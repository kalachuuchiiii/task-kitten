import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { SignUpForm } from "../types/auth.types";
import { API, renderError } from "@/utils";
import { extractErrorMessage } from "@/utils/error";
import { signUpFormSchema } from "@shared/schema";

export const useSignUp = () => {

  const [form, setForm] = useState<SignUpForm>({
    password: '',
    username: '',
    confirmPassword: ''
  })

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
        loading: "Creating your account...",
        success: (res) => res.data.message,
      }); 
      return await p;
    },
    onError: renderError
  });

  return {
    handleChangeForm,
    handleSignUp,
    isCreatingAccount: isPending,
    form
  }

}