import { createContext } from "react";
import type { useEventCalendar } from "../hooks";
import type { EventFields, EventUpdateFormFields } from "@shared/types";
import type { useEventForm } from "../hooks/useEventForm";

type EventCalendarContextValues =
  | (Omit<
      ReturnType<typeof useEventCalendar>["eventActions"],
      "eventCalendarRef"
    > & {
      selectedEvent: EventUpdateFormFields;
      eventFormControl: ReturnType<typeof useEventForm>;
    })
  | null;

export const EventCalendarContext =
  createContext<EventCalendarContextValues>(null);
