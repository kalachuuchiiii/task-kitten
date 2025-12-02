
 import { Document } from "mongoose";

export type UserSchema = Document & {
  username: string;
  nickname: string | null;
  avatar: string | null;
}

export type UserFields = Omit<UserSchema, keyof Document>;