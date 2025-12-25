import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard, AuthLayout, RequireGuest } from "@/features/auth";
import { PageLayout } from "@/components/layout/PageLayout";

const HomePage = lazy(() => import("@/features/dashboard/pages/Home.tsx"));
const SignUpPage = lazy(() => import("@/features/auth/pages/SignUpPage"));
const SignInPage = lazy(() => import("@/features/auth/pages/SignInPage"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage.tsx"));
const GettingStarted = lazy(() => import("@/pages/GettingStarted"));
const EventCalendar = lazy(() => import("@/features/planners/event-calendar/pages/EventCalendar"));
const Tasks = lazy(() => import("@/features/planners/todo-task/pages/Tasks"));
const TaskDetails = lazy(() => import("@/features/planners/todo-task/pages/TaskDetails"));
const Manager = lazy(() => import("@/features/account/manager/pages/AccountManager"));
const Preferences = lazy(() => import("@/features/account/preferences/pages/Preferences.tsx"));

export const appRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: (
          <PageLayout title="app.title">
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          </PageLayout>
        ),
      },
      {
        path: "/planners/to-do-list",
        element: (
      
          <PageLayout title = 'task_list.title' description="task_list.subtitle">
              <AuthGuard>
              <Tasks />
            </AuthGuard>
          </PageLayout>

        ),
      },
      {
        path: "/task/:id",
        element: (
          <PageLayout title = 'task_details.title'>
            <AuthGuard>
              <TaskDetails />
            </AuthGuard>
          </PageLayout>
        ),
      },
      {
        path: "/planners/event-calendar",
        element: (
          <PageLayout title="event.title" description="event.subtitle">
            <AuthGuard>
              <EventCalendar />
            </AuthGuard>
          </PageLayout>
        ),
      },
      {
        path: "/account/manager",
        element: (
          <PageLayout
            title="account_manager.title"
      
          >
            <AuthGuard>
              <Manager />
            </AuthGuard>
          </PageLayout>
        ),
      },
      {
        path: "/account/preferences",
        element: (
    
          <PageLayout title = 'preferences.title' >
              <AuthGuard>
              <Preferences />
            </AuthGuard>
          </PageLayout>
    
        ),
      },
    ],
  },
  // Public & auth-related routes
  {
    path: "/",
    element: (
      <RequireGuest>
        <LandingPage />
      </RequireGuest>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <RequireGuest>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </RequireGuest>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <RequireGuest>
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      </RequireGuest>
    ),
  },
  {
    path: "/getting-started",
    element: (
      <PageLayout title="sidebar.other.getting_started">
        <GettingStarted />
      </PageLayout>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
