import { Document, Types } from "mongoose";

export enum Status {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    IN_PROGRESS = 'in_progress'
}


export interface TaskSchema extends Document {
    status: Status;
    description: string;
    userId: Types.ObjectId;
}