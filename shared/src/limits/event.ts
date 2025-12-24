import { LimitsDict } from "../types";


export const EVENT_LIMITS: LimitsDict<'title' | 'description'> = {
  title: {
    min: 3,
    max: 60,
    code: 'event.error.title_exceeded_length_limit',
  },
  description:  {
    min: 3,
    max: 60,
    code: 'event.error.description_exceeded_length_limit',
  }
} as const;
