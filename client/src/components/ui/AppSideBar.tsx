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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px]">You</SidebarGroupLabel>
          {featureRouteLinks.map((route) => (
            <RouteLinkButton key={route.path} route={route} />
          ))}
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px]">
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
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <SignOutDialog />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};
