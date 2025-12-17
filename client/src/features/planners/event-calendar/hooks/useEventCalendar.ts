import { useSession } from "@/features/auth";
import { useApi } from "@/hooks";
import type FullCalendar from "@fullcalendar/react";
import type { EventFields, EventForm } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { TextChangeEvent } from "../../todo-task";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils";

export const useEventCalendar = () => {
  const api = useApi();
  const eventCalendarRef = useRef<FullCalendar>(null);
  const [eventForm, setEventForm] = useState<EventForm>({
    title: "",
    start: new Date(),
    end: undefined,
  });
  const [timeframe, setTimeframe] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  });

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
      return res;
    },
  });

  const {
    data,
    isPending: isFetchingEvents,
    refetch,
  } = useQuery({
    queryKey: ["month-events", timeframe.startDate.toISOString()],
    queryFn: async () => {
      const eventCalendar = eventCalendarRef.current;
      if (!eventCalendar) return;
      const res = await api.get("/event/month-events", {
        params: {
          timeframe: JSON.stringify(timeframe),
        },
      });
      console.log(res);
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [timeframe]);

  const onDateChange = (args: {
    start: Date;
    end: Date;
    startStr: string;
    endStr: string;
  }) => {
    setTimeframe({
      startDate: args.start,
      endDate: args.end,
    });
  };

  const handleSetTimeframe = (name: "start" | "end") => {
    return (date: Date | undefined) => {
      setEventForm((prev) => ({
        ...prev,
        [name]: date,
      }));
    };
  };

  const handleSetEventTitle = (e: TextChangeEvent) => {
    const { value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const events = data?.events ?? [];

  return {
    events,
    onDateChange,
    actions: {
      eventCalendarRef,
      handleSetTimeframe,
      eventForm,
      isCreatingEvent,
      createEvent,
      handleSetEventTitle,
    },
    timeframe,
    isFetchingEvents,
    eventCalendarRef,
  };
};
