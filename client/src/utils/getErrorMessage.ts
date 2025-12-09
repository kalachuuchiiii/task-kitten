import { isAxiosError } from "axios"

export const getErrorMessage = (error: unknown) => {
   console.log(error) 
   
 if(isAxiosError(error)){
    return error.response?.data.message || error.message
 }
 if(error instanceof Error){
    return error.message;
 }

 return 'Something unexpected occurred while processing your request.';
}