import { useSession } from "@/features/auth";
import { useApi } from "@/hooks";
import { renderSuccessToast } from "@/utils";
import { extractErrorCodeKeys, renderErrorToast } from "@/utils/error";
import { usernameFormSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";

export const useAccountActions = () => {
  const api = useApi();
  const { user } = useSession();

  const { mutate: updateUsername, isPending: isUpdatingUsername } = useMutation(
    {
      mutationFn: async (username: string) => {
        if (!user) return;
        const promise = new Promise((resolve, reject) => {
          try {
            const usernameForm = usernameFormSchema.strip().parse({
              newUsername: username,
              oldUsername: user.username,
              lastUsernameUpdate: user.lastUsernameUpdate,
            });
            resolve(api.patch("/auth/update-username", { usernameForm }));
          } catch (e) {
            reject(e);
          }
        });

        await toast.promise(promise, {
          loading: t("user.update_username.loading"),
          success: t("user.update_username.success"),
          error: (err: unknown) => extractErrorCodeKeys(err),
        });
        return await promise;
      },
    }
  );

  return {
    updateUsername,
    isUpdatingUsername,
  };
};
