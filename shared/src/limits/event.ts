import { regexSelelector } from "../utils";

export const EVENT_LIMITS = {
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
};
