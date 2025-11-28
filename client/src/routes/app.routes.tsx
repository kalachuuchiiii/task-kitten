import { appRoutes } from "@/constants/routes"
import { useRoutes } from "react-router-dom"



export const AppRoutes = () => {

    return useRoutes(appRoutes);
}