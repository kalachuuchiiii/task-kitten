import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import { AuthGuard, AuthLayout, RequireGuest } from "@/features/auth";

const HomePage = lazy(() => import("@/features/dashboard/pages/Home.tsx"));

const SignUpPage = lazy(() => import("@/features/auth/pages/SignUpPage"));
const SignInPage = lazy(() => import("@/features/auth/pages/SignInPage"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage.tsx"));

const EventCalendar = lazy(
  () => import("@/features/planners/event-calendar/pages/EventCalendar")
);
const ExpenseTracker = lazy(
  () => import("@/features/planners/expense-tracker/pages/ExpenseTracker")
);
const Tasks = lazy(() => import("@/features/planners/todo-task/pages/Tasks"));
const TaskDetails = lazy(() => import("@/features/planners/todo-task/pages/TaskDetails"))

const Manager = lazy(() => import('@/features/account/manager/pages/Manager.tsx'));
const Preferences = lazy(() => import('@/features/account/preferences/pages/Preferences.tsx'));


export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: (
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        ),
      },
      {
        path: "/planners/to-do-list",
        element: (
          <AuthGuard>
            <Tasks />
          </AuthGuard>
        ),
      },
      {
        path: "/task/:id",
        element: (
          <AuthGuard>
            <TaskDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/planners/expense-tracker",
        element: (
          <AuthGuard>
            <ExpenseTracker />
          </AuthGuard>
        ),
      },
      {
        path: "/planners/event-calendar",
        element: (
          <AuthGuard>
            <EventCalendar />
          </AuthGuard>
        ),
      },
      {
        path: "/account/manager",
        element: (
          <AuthGuard>
            <Manager />
          </AuthGuard>
        ),
      },
      {
        path: "/account/preferences",
        element: (
          <AuthGuard>
            <Preferences />
          </AuthGuard>
        ),
      },
    ],
  }, //public & auth-related routes starts here
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
    path: "*",
    element: <NotFoundPage />,
  },
];
