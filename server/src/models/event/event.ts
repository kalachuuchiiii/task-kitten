import { verifyOwnerPlugin } from "@/plugins";
import { EVENT_LIMIT } from "@shared/limits";
import { EventSchema } from "@shared/types";
import mongoose, { Types } from "mongoose";

const { description, title } = EVENT_LIMIT;


const eventSchema = new mongoose.Schema<EventSchema>({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: [description.MAX, description.MESSAGE],
        required: true
    },
    title: {
        type: String,
        maxlengh: [title.MAX, title.MESSAGE],
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

eventSchema.plugin(verifyOwnerPlugin<EventSchema>('userId'));

export const Event = mongoose.model('Event', eventSchema); //literal event...