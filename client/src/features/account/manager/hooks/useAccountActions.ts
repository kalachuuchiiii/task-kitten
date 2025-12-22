import { useSession } from "@/features/auth"
import { useApi } from "@/hooks"
import { extractSuccessMessage } from "@/utils"
import { renderErrorToast } from "@/utils/error"
import { usernameFormSchema } from "@shared/schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useAccountActions = () => {
    const api = useApi();
    const { user } = useSession();

    const { mutate: updateUsername, isPending: isUpdatingUsername } = useMutation({
        mutationFn: async(username: string) => {
            if(!user)return;
            const usernameForm = usernameFormSchema.strip().parse({ newUsername: username, oldUsername: user.username, lastUsernameUpdate: user.lastUsernameUpdate });
            const p = api.patch('/auth/update-username', { usernameForm })
            
            await toast.promise(p, {
                loading: 'Updating username...',
                success: extractSuccessMessage,
            })
            return await p;
        },
        onError: renderErrorToast
    })

    return {
        updateUsername,
        isUpdatingUsername
    }
}