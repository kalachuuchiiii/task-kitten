import { Document, Types } from "mongoose";

enum Status {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    IN_PROGRESS = 'in_progress'
}

export interface TaskSchema extends Document {
    status: Status;
    description: string;
    user: Types.ObjectId;
}