import { createContext } from "react";
import type { useEventCalendar } from "../hooks";

type EventCalendarContextValues = Pick<ReturnType<typeof useEventCalendar>, 'actions'>['actions'] | null;

export const EventCalendarContext = createContext<EventCalendarContextValues>(null);