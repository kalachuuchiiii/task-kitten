import { AppSidebar } from "@/components/ui/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";


const HomePage = () => {

    return (
      <div>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    );
}

export default HomePage;