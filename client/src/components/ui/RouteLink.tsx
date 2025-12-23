import type { RouteLink } from "@/types/route-link";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { NavLink } from "react-router-dom";
import { useSession } from "@/features/auth";
import { LinkPlaceholder } from "./LinkPlaceholder";
import {  useTranslation } from "react-i18next";

const linkStyle = "truncate p-2 text-sm tracking-tight";

export const RouteLinkButton = ({ route }: { route: RouteLink }) => {
  const { isLookingForSession, user } = useSession();
  const { t } = useTranslation();

  if (isLookingForSession || !user) {
    return <LinkPlaceholder />;
  }

  return (
    <SidebarMenuItem key={route.path}>
      <SidebarMenuButton asChild>
        <NavLink className={linkStyle} to={route.path}>
          {route?.icon} <p>{t(route.code)}</p>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
