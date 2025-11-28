import type { User } from "./User";



export type SessionState = Pick<Session, 'user' | 'accessToken'>;

export type Session = {
  isAuthenticated: boolean;
  user: User | null;
  setAccessToken: (token: string) => void;
  isLookingForSession: boolean;
  accessToken: string | null;
  getSession: () => Promise<void>;
  clearSession: () => void;
};