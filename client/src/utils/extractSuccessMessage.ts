import type { AxiosResponse } from "axios";


export const extractSuccessMessage = (response: AxiosResponse<{ success: boolean, message: string }>) => {
    if(!response.data.success) return '';
    return response.data.message;
}