import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarSeparator,
} from "./sidebar";
import { useSession } from "@/features/auth/hooks/useSession";
import { UserBadge } from "./UserBadge";
import {
  featureRouteLinks,
  otherRouteLinks,
  plannerRouteLinks,
} from "@/constants/navigationRoutes";

import { RouteLinkButton } from "./RouteLink";
import { SignOutDialog } from "./SignOutDialog";
import { AlertDialog, AlertDialogTrigger } from "./alert-dialog";
import { LogOut } from "lucide-react";
import { Separator } from "./separator";

export const AppSidebar = () => {
  const { user } = useSession();

  return (
    <Sidebar variant="floating" className="w-62 h-screen overflow-hidden">
      <SidebarHeader>
        <div className="p-2 text-lg font-semibold py-4">
          <UserBadge user={user} avatarSize={8} />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px]">You</SidebarGroupLabel>
          {featureRouteLinks.map((route) => (
            <RouteLinkButton key={route.path} route={route} />
          ))}
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] ">
            Planners
          </SidebarGroupLabel>
          {plannerRouteLinks.map((route) => (
            <RouteLinkButton key={route.path} route={route} />
          ))}
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          {otherRouteLinks.map((route) => (
            <RouteLinkButton key={route.path} route={route} />
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs  opacity-70">
        <SidebarMenuButton asChild>
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 p-2">
              <LogOut size="18" className="text-red-600 " />
              <Separator orientation="vertical" />
              <p>Sign out</p>
            </AlertDialogTrigger>
                <SignOutDialog />
          </AlertDialog>
      
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
