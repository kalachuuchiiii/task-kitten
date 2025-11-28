
import { lazy } from "react";
import {  type RouteObject } from "react-router-dom";
import AppLayout from "@/features/app/layout/AppLayout.tsx";
import { AuthGuard } from "@/features/auth/components/guards/AuthGuard.tsx";
import { RequireGuest } from "@/features/auth/components/guards/RequireGuest.tsx";

const HomePage = lazy(() => import('@/features/app/pages/HomePage.tsx'));
const ToDoPage = lazy(() => import('@/features/app/pages/ToDoPage.tsx'));
const SignUpPage = lazy(() => import("../features/auth/pages/SignUpPage"));
const SignInPage = lazy(() => import("../features/auth/pages/SignInPage"))
const LandingPage = lazy(() => import("../pages/LandingPage"));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.tsx'));

export const appRoutes: RouteObject[] = [
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
            <ToDoPage />
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
        <SignInPage />
      </RequireGuest>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <RequireGuest>
        <SignUpPage />
      </RequireGuest>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

