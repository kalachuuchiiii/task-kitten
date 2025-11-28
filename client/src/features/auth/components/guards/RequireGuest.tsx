

import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useSession } from "@/features/auth/hooks/useSession"
import type { JSX } from "react";
import { Navigate } from "react-router-dom";


export const RequireGuest = ({ children } : { children: JSX.Element}) => {

    const { isAuthenticated, isLookingForSession } = useSession();

    if(isLookingForSession){
        return <LoadingDisplay />;
    }

    const isAuthorized = isAuthenticated && !isLookingForSession;

    return isAuthorized ? <Navigate to = '/home' replace /> : children;
}