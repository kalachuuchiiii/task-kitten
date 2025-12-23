import z from "zod";
import { toDate } from "../utils/toDate";
import { EVENT_LIMIT } from "../limits";

const { title, description } = EVENT_LIMIT;

export const eventTimeframeSchema = z
  .object({
    start: z.preprocess(toDate({excludeTime: true }), z.date() ),
    end: z.preprocess(toDate({ excludeTime: true }), z.date())
  })
  .refine((event) => event.end >= event.start, {
    message: 'End date must be after or equal to the start date',
    path: ['end']
  })

export const eventFormSchema = z
  .object({
    title: z.string().max(title.MAX, title.MESSAGE).min(title.MIN, title.MESSAGE),
    start: z.preprocess(toDate({ excludeTime: true }), z.date()),
    description: z.string().max(description.MAX, description.MESSAGE).min(description.MIN, description.MESSAGE),
    end: z.preprocess(toDate({ excludeTime: true }), z.date()).optional(),
  }).refine((event) => !event.end || event.end >= event.start, {
    message: 'End date must be after or equal to the start date',
    path: ['end']
  })
