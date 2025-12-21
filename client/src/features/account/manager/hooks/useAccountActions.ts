import { useApi } from "@/hooks"
import { renderError } from "@/utils"
import { extractErrorMessage } from "@/utils/error"
import { usernameSchema } from "@shared/schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useAccountActions = () => {
    const api = useApi();

    const { mutate: updateUsername, isPending: isUpdatingUsername } = useMutation({
        mutationFn: async(username: string) => {
            const newUsername = usernameSchema.parse(username);
            const p = api.patch('/auth/update-username', { newUsername })
            
            await toast.promise(p, {
                loading: 'Updating username...',
                success: 'Updated username successfully!',
            })
            return await p;
        },
        onError: renderError
    })

    return {
        updateUsername,
        isUpdatingUsername
    }
}