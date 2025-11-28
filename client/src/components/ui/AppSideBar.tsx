import { NavLink, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "./sidebar"
import { useSession } from "@/features/auth/hooks/useSession";
import { UserBadge } from "./UserBadge";
import { LoadingDisplay } from "./LoadingDisplay";
import { featureRouteLinks, otherRouteLinks, plannerRouteLinks } from "@/constants/nav-links";
import type { RouteLink } from "@/types/route-link";
import { Separator } from "./separator";
import { LogOut } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { useMutation } from "@tanstack/react-query";
import { signOut as sign_out } from "@/features/auth/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

  const linkStyle = 'truncate p-2 text-sm tracking-tight';


const RouteLink = ({ route }: {route: RouteLink }) => {

  return (
    <SidebarMenuItem key={route.path}>
      <SidebarMenuButton asChild>
        <NavLink className={linkStyle} to={route.path}>
          {route?.icon} {route.name}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}


export const AppSidebar = () => {

  const { user, clearSession } = useSession();
  const nav = useNavigate();
  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async() => {
      const p = sign_out();
      toast.promise(p, {
        loading: 'Signing you out...',
        success: 'Signed out successfully!',
        error: (err) => getErrorMessage(err)
      })
      return await p;
    },
    onSuccess: () => {
      clearSession();
      nav('/sign-in');
    }
  }) 


  if(!user)return <LoadingDisplay />;

    return (
      <Sidebar className="w-62 overflow-hidden">
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
              <RouteLink key={route.path} route={route} />
            ))}
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px]">
              Planners
            </SidebarGroupLabel>
            {plannerRouteLinks.map((route) => (
              <RouteLink key={route.path} route={route} />
            ))}
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            {otherRouteLinks.map((route) => (
              <RouteLink key={route.path} route={route} />
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton asChild>
            <div>
              <LogOut className="text-red-600" />{" "}
              <Separator orientation="vertical" />{" "}
              <Dialog>
                <DialogTrigger>Sign Out</DialogTrigger>
                <DialogContent>
                  <DialogTitle> Sign out of your account?</DialogTitle>
                  <DialogDescription>
                    You will need to sign back in.
                  </DialogDescription>
                  <div className="flex gap-2 justify-end">
                    <DialogClose>
                      <Button className="button-bg">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => signOut()}
                      disabled={isSigningOut}
                      variant={"secondary"}
                    >
                      Sign out
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    );
}