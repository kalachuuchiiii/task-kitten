import { Document } from "mongoose";


export type EventSchema = Document & {
    title: string;
    start: Date;
    end?: Date | undefined;
    userId: Types.ObjectId
}

export type EventFields = Omit<EventSchema, keyof Document>

export type EventForm = Omit<EventFields, 'userId'>