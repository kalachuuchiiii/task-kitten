import { Document } from "mongoose";


export type EventSchema = Document & {
    title: string;
    start: Date;
    description: string;
    end?: Date | undefined;
    userId: Types.ObjectId;
    verifyOwner: (userId: string) => EventSchema;
}

export type EventFields = Omit<EventSchema, keyof Document | 'verifyOwner'>

export type EventForm = Omit<EventFields, 'userId' | 'verifyOwner'>