import type { RouteLink } from "@/types/route-link";
import { CalendarCheck, CoinsIcon, ListChecksIcon, Settings2, StarsIcon, User } from "lucide-react";



export const plannerRouteLinks: RouteLink[] = [
    {
      code: 'sidebar.planners.todoList',
      path: '/planners/to-do-list',
      icon: <ListChecksIcon />
    },{
      code: 'sidebar.planners.eventCalendar',
      path: '/planners/event-calendar',
      icon: <CalendarCheck />
    }
  ]

 export const featureRouteLinks: RouteLink[] = [
    {
      code: 'sidebar.you.account',
      path: '/account/manager',
      icon: <User />
    },
    {
      code: 'sidebar.you.preferences',
      path: '/account/preferences',
      icon: <Settings2 />
    }
  ]

 export const otherRouteLinks: RouteLink[] = [
    {
      code: "sidebar.other.gettingStarted",
      path: "/getting-started",
      icon: <StarsIcon />,
    }
  ];