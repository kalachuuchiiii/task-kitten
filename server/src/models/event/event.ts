import { verifyOwnerPlugin } from "@/plugins";
import { EVENT_DESCRIPTION_LIMIT, EVENT_TITLE_LIMIT } from "@shared/constants";
import { EventSchema } from "@shared/types";
import mongoose, { Types } from "mongoose";


const eventSchema = new mongoose.Schema<EventSchema>({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: [EVENT_DESCRIPTION_LIMIT.LENGTH, EVENT_DESCRIPTION_LIMIT.MESSAGE],
        required: true
    },
    title: {
        type: String,
        maxlengh: [EVENT_TITLE_LIMIT.LENGTH, EVENT_TITLE_LIMIT.MESSAGE],
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