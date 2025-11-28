import { useState, type FormEvent } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { signUp, type SignUpForm } from "../api";


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
      const p = signUp({ ...form });
      toast.promise(p, {
        loading: "Creating your account...",
        error: (err) => getErrorMessage(err),
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