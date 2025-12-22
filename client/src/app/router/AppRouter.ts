import { useRoutes } from "react-router-dom";
import { appRoutes } from "./AppRoutes";




export const AppRouter = () => {

  return useRoutes(appRoutes);
};
