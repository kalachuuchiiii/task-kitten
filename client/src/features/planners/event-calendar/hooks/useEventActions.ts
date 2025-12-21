import { useApi } from "@/hooks";
import type FullCalendar from "@fullcalendar/react";
import type { EventForm } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { TextChangeEvent } from "../../todo-task";
import { createEventFormDefault } from "@shared/defaults";
import { extractErrorMessage } from "@/utils/error";
import { eventFormSchema } from "@shared/schema";
import { renderError } from "@/utils";

export const useEventActions = (
  initialValue: EventForm = createEventFormDefault()
) => {
  const api = useApi();
  const [eventForm, setEventForm] = useState<EventForm>(initialValue);
  const eventCalendarRef = useRef<FullCalendar>(null);

  const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const parsed = eventFormSchema.strip().parse(eventForm);
      const p = api.post("/event/create", { eventForm: parsed });
      await toast.promise(p, {
        loading: "Creating event...",
        success: "Event created successfully!",
      });
      const res = await p;
      eventCalendarRef.current?.getApi().addEvent(res.data.newEvent);
      setEventForm(createEventFormDefault());
      return res;
    },
    onError: renderError 
  });

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const parsed = eventFormSchema.strip().parse(eventForm);
      const p = api.patch(`/event/update/${eventId}`, { eventForm: parsed });
      await toast.promise(p, {
        loading: "Updating event...",
        success: "Event successfully updated!",
      });
      setEventForm(createEventFormDefault());
      return await p;
    },
     onError: renderError
  });

  const { mutate: deleteEvent, isPending: isDeletingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const p = api.delete(`/event/delete/${eventId}`);
      await toast.promise(p, {
        loading: "Deleting event...",
        success: "Event deleted successfully!",
        error: (err: unknown) => extractErrorMessage(err),
      });
      return await p;
    },

  });

  const handleSetEventText =  (e: TextChangeEvent) => {
    const { name, value } = e.target;
      setEventForm((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  const handleSetTimeframe = (name: "start" | "end") => {
    return (date: Date | undefined) => {
      setEventForm((prev) => ({
        ...prev,
        [name]: date,
      }));
    };
  };

  return {
    actions: {
      deleteEvent,
      isDeletingEvent,
      createEvent,
      isCreatingEvent,
      updateEvent,
      isUpdatingEvent,
    },
    eventCalendarRef,
    formControl: {
      handleSetTimeframe,
      eventForm,
         setEventForm,
      handleSetEventText,
    },
  };
};
