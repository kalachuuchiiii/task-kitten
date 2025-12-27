import { useApi } from "@/hooks";
import { renderSuccessToast } from "@/utils";
import { extractErrorCodeKeys, renderErrorToast } from "@/utils/error";
import { passwordFormSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { z } from "zod";
export const useAuthActions = () => {
  const api = useApi();

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationFn: async (form: z.infer<typeof passwordFormSchema>) => {
        const parsedPasswordForm = passwordFormSchema.strip().parse(form);
        const p = await api.patch("/auth/update-password", {
          passwordForm: parsedPasswordForm,
        });
        return p;
      },
      onMutate: () => toast.loading(t('auth.update_password.loading'), { id: 'update-password'}),
      onError: (err) => toast.error(extractErrorCodeKeys(err), { id: 'update-password'}),
      onSuccess: (res) => toast.success(t(res.data.code), { id: 'update-password'})
     }
  );

  return {
    updatePassword,
    isUpdatingPassword,
  };
};
