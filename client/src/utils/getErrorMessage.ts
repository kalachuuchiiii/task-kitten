import { isAxiosError } from "axios"

export const getErrorMessage = (error: unknown) => {
 if(isAxiosError(error)){
    return error.response?.data.message;
 }
 if(error instanceof Error){
    return error.message;
 }

 return 'Something unexpected occurred while processing your request.';
}