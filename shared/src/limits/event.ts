import { createRestraints } from "../utils";

export const EVENT_LIMIT = {
  title: createRestraints(6, 60, "Event Title"),
  description: createRestraints(1, 300, "Event Description"),
};
