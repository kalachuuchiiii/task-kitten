import { createContext } from "react";
import type { useEventCalendar } from "../hooks";

type EventCalendarContextValues = ReturnType<typeof useEventCalendar>['eventActions'] | null;

export const EventCalendarContext = createContext<EventCalendarContextValues>(null);