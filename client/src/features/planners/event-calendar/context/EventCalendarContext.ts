import { createContext } from "react";
import type { useEventCalendar } from "../hooks";
import type { EventFields, EventUpdateFormFields } from "@shared/types";

type EventCalendarContextValues =
  | (Omit<
      ReturnType<typeof useEventCalendar>["eventActions"],
      "eventCalendarRef"
    > & { selectedEvent: EventUpdateFormFields })
  | null;

export const EventCalendarContext =
  createContext<EventCalendarContextValues>(null);
