import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { SignUpForm } from "../types/auth.types";
import { API } from "@/utils";
import { extractErrorMessage } from "@/utils/error";

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
      const p = API.post('/auth/sign-up', { ...form });
      toast.promise(p, {
        loading: "Creating your account...",
        error: (err) => extractErrorMessage(err),
        success: (res) => res.data.message,
      }); 
      return await p;
    },
  });

  return {
    handleChangeForm,
    handleSignUp,
    isCreatingAccount: isPending,
    form
  }

}