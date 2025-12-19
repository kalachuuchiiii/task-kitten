import { Document, Types } from "mongoose";

export type EventSchema = Document & {
  title: string;
  start: Date;
  description: string;
  end?: Date | undefined;
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  verifyOwner: (userId: string) => EventSchema;
};

export type EventFields = Omit<EventSchema, keyof Document | "verifyOwner">;
export type EventUpdateFormFields = Omit<EventFields, "userId"> & {
  _id: string;
};

export type EventForm = Omit<EventFields, "userId" | "verifyOwner">;
