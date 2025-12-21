
 import { Document } from "mongoose";

export type UserSchema = Document & {
  username: string;
  nickname: string | null;
  isOnboarding: boolean;
  lastUsernameUpdate: Date | null;
  avatar: string | null;
  getUsernameUpdateRemainingCooldown: () => number;
}

export type UserFields = Omit<UserSchema, keyof Document | 'getUsernameUpdateRemainingCooldown'>;