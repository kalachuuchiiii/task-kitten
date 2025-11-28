import { Document } from "mongoose";

export interface UserSchema extends Document {
  username: string;
  nickname: string | null;
  avatar: string | null;
}