
import mongoose, { Types } from "mongoose";
import bcrypt from 'bcryptjs';
import { CredentialsSchema } from "../../types/credentials";
import { InternalServerError } from "../../utils/errors/Errors";


const credentialsSchema = new mongoose.Schema<CredentialsSchema>({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    }
})

credentialsSchema.pre('save', async function() {
    if(!this.isModified('password'))return;
    try {
        const salt: string = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(e){
      throw new InternalServerError();
    }
})

credentialsSchema.methods.isPasswordCorrect = async function(candidatePassword: string){
 return await bcrypt.compare(candidatePassword, this.password);
}
export const Credentials = mongoose.model('Credential', credentialsSchema);

