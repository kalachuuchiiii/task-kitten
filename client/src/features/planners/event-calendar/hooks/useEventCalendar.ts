import { useApi } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useEventActions } from "./useEventActions";
import type { EventUpdateFormFields } from "@shared/types";
import type { EventClickArg } from "@fullcalendar/core";
import { useEventDetails } from "./useEventDetails";

export const useEventCalendar = () => {
  const api = useApi();
  const [timeframe, setTimeframe] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  });
  const eventActions = useEventActions();
  const {
    formControl: { setEventForm },
  } = eventActions;
  const eventDetailsControl = useEventDetails();
  const { openDetailSheet } = eventDetailsControl;

  const {
    data,
    isPending: isFetchingEvents,
    refetch,
  } = useQuery({
    queryKey: [
      "month-events",
      timeframe.start.toISOString(),
      timeframe.end.toISOString(),
    ],
    queryFn: async () => {
      const res = await api.get("/event/month-events", {
        params: {
          timeframe: JSON.stringify(timeframe),
        },
      });
      return res.data;
    },
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
      start: args.start,
      end: args.end,
    });
  };

  const handleEventClick = (info: EventClickArg) => {
    console.log(info.event._instance?.range.start)
    const eventObj: EventUpdateFormFields & { allDay: boolean }= {
      title: info.event._def.title,
      _id: info.event._def.extendedProps._id,
      start: info.event._instance?.range.start ?? new Date(),
      description: info.event._def.extendedProps?.description ?? "",
      end: info.event._instance?.range.end ?? undefined,
      allDay: true
    };
    setEventForm(eventObj);
    openDetailSheet(eventObj);
  };

  const events = data?.events ?? [];

  return {
    events,
    onDateChange,
    eventActions,
    eventDetailsControl: {
      ...eventDetailsControl,
      handleEventClick,
    },
    timeframe,
    isFetchingEvents,
  };
};
