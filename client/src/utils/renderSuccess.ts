import type { LocaleKeys } from "@shared/types";
import type { AxiosResponse } from "axios";
import { t } from "i18next";
import { toast } from "sonner";


export const renderSuccessToast = (response: AxiosResponse<{ success: boolean, code: LocaleKeys, params: Record<string, any> }>) => {
    let msg = 'error.internal';
    let params = {};
    if(response.data.success){
        msg = response.data.code;
        params = response.data.params;
    }

   return toast.success(t(msg));
}