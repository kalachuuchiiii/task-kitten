



import { AppSidebar } from '@/components/ui/AppSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
      <Outlet />
    </div>
  );
}

export default AppLayout