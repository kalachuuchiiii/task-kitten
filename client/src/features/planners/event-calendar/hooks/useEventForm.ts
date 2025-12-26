import { createEventFormDefault } from "@shared/defaults";
import type { EventForm } from "@shared/types";
import { useState } from "react";
import type { TextChangeEvent } from "../../todo-task";

export const useEventForm = (
  initialValue: EventForm = createEventFormDefault()
) => {
  const [eventForm, setEventForm] = useState<EventForm>(initialValue);

  const handleSetEventText = (e: TextChangeEvent) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSetTimeframe = (name: "start" | "end") => {
    return (date: Date | undefined) => {
      setEventForm((prev) => ({
        ...prev,
        [name]: date,
      }));
    };
  };

  return {
    eventForm,
    handleSetEventText,
    handleSetTimeframe,
    setEventForm
  }
};
