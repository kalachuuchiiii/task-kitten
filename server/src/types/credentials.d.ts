import { Document, Types } from "mongoose";


export interface CredentialsSchema extends Document {
    password: string;
    email: string | null;
    user: Types.ObjectId;
    isPasswordCorrect: (candidatePass: string) => boolean;
}