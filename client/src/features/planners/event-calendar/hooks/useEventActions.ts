import { useApi } from "@/hooks";
import type FullCalendar from "@fullcalendar/react";
import type { EventForm } from "@shared/types";
import { useMutation } from "@tanstack/react-query";
import {  useRef, useState } from "react";
import { toast } from "sonner";
import type { TextChangeEvent } from "../../todo-task";
import { createEventFormDefault } from "@shared/defaults";
import { extractErrorMessage, renderErrorToast } from "@/utils/error";
import { eventFormSchema } from "@shared/schema";
import { extractSuccessMessage } from "@/utils";
import { useTranslation } from "react-i18next";

export const useEventActions = (
  initialValue: EventForm = createEventFormDefault()
) => {
  const api = useApi();
  const [eventForm, setEventForm] = useState<EventForm>(initialValue);
  const { t } = useTranslation();
  const eventCalendarRef = useRef<FullCalendar>(null);

  const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const parsed = eventFormSchema.strip().parse(eventForm);
      const p = api.post("/event/create", { eventForm: parsed });
      await toast.promise(p, {
        loading: t('event.create.loading'),
        success: t('event.create.success'),
      });
      const res = await p;
      eventCalendarRef.current?.getApi().addEvent(res.data.newEvent);
      setEventForm(createEventFormDefault());
      return res;
    },
    onError: renderErrorToast 
  });

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const parsed = eventFormSchema.strip().parse(eventForm);
      const p = api.patch(`/event/update/${eventId}`, { eventForm: parsed });
      await toast.promise(p, {
        loading: t('event.update.loading'),
        success: t("event.update.success"),
      });
      setEventForm(createEventFormDefault());
      return await p;
    },
     onError: renderErrorToast
  });

  const { mutate: deleteEvent, isPending: isDeletingEvent } = useMutation({
    mutationFn: async (eventId: string) => {
      const p = api.delete(`/event/delete/${eventId}`);
      await toast.promise(p, {
        loading: t('event.delete.loading'),
        success: t('event.delete.success'),
        error: extractErrorMessage,
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
