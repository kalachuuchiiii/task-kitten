import { useSession } from "@/features/auth/hooks/useSession"
import { API } from "@/utils";
import { t } from "i18next";

import { useEffect } from "react";
import { toast } from "sonner";


export const useApi = () => {

  const { accessToken, setAccessToken, isLookingForSession } = useSession();
  useEffect(() => {

    if (!accessToken || isLookingForSession) return;
    const interceptorId = API.interceptors.request.use((config) => {
      if (!navigator.onLine) {

        toast.error(t('network.error.offline'));
        throw new Error('netork.error.offline');
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    const responseInterceptorId = API.interceptors.response.use(
      (response) => {
        console.log(`${response.config.method} ${response.config.url}`, response);
        return response;
      },
      async(error) => {
        const originalRequest = error.config;
        const res = await API.post('/auth/refresh');
        const newAccessToken = res.data.accessToken;
    
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
  }, [accessToken]);

  return API;
}