
import { isAlphanumeric } from "@/utils";
import { USER_LIMITS } from "@shared/limits";
import { UserSchema } from "@shared/types";
import mongoose from "mongoose";

const { username, nickname } = USER_LIMITS;

const userSchema = new mongoose.Schema<UserSchema>({
    username: {
        type: String,
        minlength: [username.min, username.code],
        maxlength: [username.max, username.code], 
        validate: {
            validator: function(candidateUsername: string){
                return username.pattern.exp.test(candidateUsername);
            },
            message: username.pattern.code
        },
        unique: true,
        required: true
    },
    avatar: {
        type: String,
        default: null,
    },
    nickname: {
        type: String,
        minlength: [nickname.min, nickname.code],
        maxlength: [nickname.max, nickname.code],
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