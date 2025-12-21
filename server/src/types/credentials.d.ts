import { Document, Types } from "mongoose";


export interface CredentialsSchema extends Document {
    password: string;
    email: string | null;
    userId: Types.ObjectId | string;
    isPasswordCorrect: (candidatePass: string) => boolean;
}