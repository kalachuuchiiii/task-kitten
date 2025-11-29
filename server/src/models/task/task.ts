
import mongoose, { Types } from "mongoose";
import { Status, TaskSchema } from "../../types/task";


const taskSchema = new mongoose.Schema<TaskSchema>({
    description: {
        type: String,
        minlength: [1, 'Description cannot be empty.'],
        maxlength: [500, 'Description cannot exceed 500 characters.'],
        required: true
    },
    status: {
        type: String,
        enum: Object.keys(Status),
        default: Status.PENDING
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export const Task = mongoose.model('Task', taskSchema);
