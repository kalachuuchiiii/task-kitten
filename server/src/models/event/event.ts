import { verifyOwnerPlugin } from "@/plugins";
import { EVENT_LIMITS } from "@shared/limits";
import { EventSchema } from "@shared/types";
import mongoose, { Types } from "mongoose";

const { description, title } = EVENT_LIMITS;


const eventSchema = new mongoose.Schema<EventSchema>({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: [description.max, description.code],
        required: true
    },
    title: {
        type: String,
        maxlengh: [title.max, title.code],
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: false,
        default: undefined
    }
}, { timestamps: true })

eventSchema.plugin(verifyOwnerPlugin<EventSchema>('userId', 'Event'));

export const Event = mongoose.model('Event', eventSchema); //literal event...