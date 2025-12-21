
import { isAlphanumeric } from "@/utils";
import { UserSchema } from "@shared/types";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema<UserSchema>({
    username: {
        type: String,
        minlength: [6, 'Username is too short!'],
        maxlength: [26, 'Username is too long!'], 
        validate: {
            validator: function(username: string){
                return isAlphanumeric(username);
            },
            message: 'Username can only contain letters (a-z) and numbers (0-9).'
        },
        unique: true,
        required: [true, 'Username cannot be empty.']
    },
    avatar: {
        type: String,
        default: null,
    },
    nickname: {
        type: String,
        minlength: [1, 'Nickname cannot be empty'],
        maxlength: [36, 'Nickname can only contain up to 36 characters'],
        default: null
    },
    lastUsernameUpdate: {
        type: Date,
        default: null
    },
    isOnboarding: {
        type: Boolean,
        default: true,
    }
})

userSchema.methods.getUsernameUpdateRemainingCooldown = function() {
    if(this.lastUsernameUpdate === null)return 0;
    const gap = new Date().getTime() - this.lastUsernameUpdate.getTime();
    const remaining = (1000 * 60 * 60 * 24 * 14) - gap;
    return remaining;
}

export const User = mongoose.model("User", userSchema);