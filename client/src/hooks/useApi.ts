import { useSession } from "@/features/auth/hooks/useSession"
import API from "@/utils/axios-instance";
import { useEffect } from "react";


export const useApi = () => {

    const { accessToken, setAccessToken } = useSession();

    useEffect(() => {
      const interceptorId = API.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });

      const responseInterceptorId = API.interceptors.response.use(
        (response) => {
         console.log(`${response.config.method} ${response.config.url}`, response);
         return response;
        },
        (error) => {
          const originalRequest = error.config;
          const newAccessToken = error?.response?.data?.newAccessToken;
          if (error.response.status === 401 && newAccessToken) {
            setAccessToken(newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return API(originalRequest);
          }
          throw error;
        }
      );

 return () => {
   API.interceptors.request.eject(interceptorId);
   API.interceptors.response.eject(responseInterceptorId);
 };
    }, [accessToken, setAccessToken]);

    return API;
}