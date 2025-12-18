import { useApi } from "@/hooks";
import { getErrorMessage } from "@/utils";
import type FullCalendar from "@fullcalendar/react";
import type { EventForm } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { TextChangeEvent } from "../../todo-task";
import { createEventFormDefault } from "@shared/defaults";

export const useEventActions = (
  initialValue: EventForm = createEventFormDefault()
) => {
  const api = useApi();
  const [eventForm, setEventForm] = useState<EventForm>(initialValue);
  const eventCalendarRef = useRef<FullCalendar>(null);

  const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
    mutationFn: async () => {
      const p = api.post("/event/create", { eventForm });
      await toast.promise(p, {
        loading: "Creating event...",
        success: "Event created successfully!",
        error: (err: unknown) => getErrorMessage(err),
      });
      const res = await p;
      eventCalendarRef.current?.getApi().addEvent(res.data.newEvent);
      setEventForm(createEventFormDefault());
      return res;
    },
  });

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const p = api.patch(`/event/update/${eventId}`, { eventForm });
      await toast.promise(p, {
        loading: "Updating event...",
        success: "Event successfully updated!",
        error: (err: unknown) => getErrorMessage(err),
      });
      setEventForm(createEventFormDefault());
      return await p;
    },
  });

  const { mutate: deleteEvent, isPending: isDeletingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const p = api.delete(`/event/delete/${eventId}`);
      await toast.promise(p, {
        loading: "Deleting event...",
        success: "Event deleted successfully!",
        error: (err: unknown) => getErrorMessage(err),
      });
      return await p;
    },
  });

  const handleSetEventTitle = (e: TextChangeEvent) => {
    const { value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      title: value,
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
      handleSetEventTitle,
    },
  };
};
