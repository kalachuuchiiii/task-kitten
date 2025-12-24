import z from "zod";
import { toDate } from "../utils/toDate";
import { EVENT_LIMITS } from "../limits";
import { applyLimits } from "../utils";

const { title, description } = EVENT_LIMITS;

export const eventTimeframeSchema = z
  .object({
    start: z.preprocess(toDate({ excludeTime: true }), z.date()),
    end: z.preprocess(toDate({ excludeTime: true }), z.date()),
  })
  .refine((event) => event.end >= event.start, {
    message: "event.error.end_must_be_ahead",
    path: ["end"],
  });

export const eventFormSchema = z
  .object({
    title: applyLimits(title),
    description: applyLimits(description),
    start: z.preprocess(toDate({ excludeTime: true }), z.date()),
    end: z.preprocess(toDate({ excludeTime: true }), z.date()).optional(),
  })
  .refine((event) => !event.end || event.end >= event.start, {
    message: "event.error.end_must_be_ahead",
    path: ["end"],
  });
