import type { UserFields } from "@shared/types";

export type SignInForm = { username: string; password: string };
export type SignUpForm = SignInForm & { confirmPassword: string };

export type SessionState = Pick<Session, 'user' | 'accessToken'>;

export type Session = {
  isAuthenticated: boolean;
  totalOwnedTasks: number;
  user: UserFields | null;
  setAccessToken: (token: string) => void;
  isLookingForSession: boolean;
  accessToken: string | null;
  getSession: () => Promise<void>;
  clearSession: () => void;
};
