
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../ui/AppSideBar";
import { Outlet } from "react-router-dom";
import { useSession } from "@/features/auth";
import { LoadingDisplay } from "../ui/LoadingDisplay";


export const AppLayout = () => {

  const { isLookingForSession }  = useSession();
 
  if(isLookingForSession){
    return <LoadingDisplay />;
  }

    return (
      <div>
        <SidebarProvider>
          <AppSidebar />
          <div className="p-10 w-full">
            <Outlet />
          </div>
        </SidebarProvider>
      </div>
    );
}