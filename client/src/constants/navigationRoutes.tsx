import type { RouteLink } from "@/types/route-link";
import { CalendarCheck, CoinsIcon, ListChecksIcon, Settings2, StarsIcon, User } from "lucide-react";



export const plannerRouteLinks: RouteLink[] = [
    {
      name: 'To Do List',
      path: '/planners/to-do-list',
      icon: <ListChecksIcon />
    },{
      name: 'Event Calendar',
      path: '/planners/event-calendar',
      icon: <CalendarCheck />
    }
  ]

 export const featureRouteLinks: RouteLink[] = [
    {
      name: 'Account',
      path: '/account/manager',
      icon: <User />
    },
    {
      name: 'Preferences',
      path: '/account/preferences',
      icon: <Settings2 />
    }
  ]

 export const otherRouteLinks: RouteLink[] = [
    {
      name: "Getting Started",
      path: "/getting-started",
      icon: <StarsIcon />,
    }
  ];