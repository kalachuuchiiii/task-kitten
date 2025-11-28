
import mongoose, { Types } from "mongoose";
import { TaskSchema } from "../../types/task";


const taskSchema = new mongoose.Schema<TaskSchema>({
    description: {
        type: String,
        minlength: [1, 'Description cannot be empty.'],
        maxlength: [500, 'Description cannot exceed 500 characters.'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'in_progress', 'completed']
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

export const Task = mongoose.model('Task', taskSchema);
