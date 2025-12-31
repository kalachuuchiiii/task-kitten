
import mongoose, { Types } from "mongoose";
import bcrypt from 'bcryptjs';
import { InternalServerError } from "@/utils/errors";
import { CredentialsSchema } from "@/types";
import { config } from "@/config/env";
import { applyLimits } from "@shared/utils";
import { CREDENTIAL_LIMITS, USER_LIMITS } from "@shared/limits";
import z from "zod";


const credentialsSchema = new mongoose.Schema<CredentialsSchema>({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null,
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    }
})

const glue = (pass: string) => `${config.PEPPER}${pass.trim()}`


credentialsSchema.methods.isPasswordCorrect = async function(candidatePassword: string){
    const passwordToCompare = glue(candidatePassword);
 return await bcrypt.compare(passwordToCompare, this.password);
}
export const Credentials = mongoose.model('Credential', credentialsSchema);

