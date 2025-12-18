
import { useApi } from "@/hooks";
import {  useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useEventActions } from "./useEventActions";
import { useEventDetails } from "./useEventDetails";



export const useEventCalendar = () => {
  const api = useApi();
  const [timeframe, setTimeframe] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  });
  const eventActions = useEventActions();
  const eventDetailsControl = useEventDetails();
  const {
    data,
    isPending: isFetchingEvents,
    refetch,
  } = useQuery({
    queryKey: ["month-events", timeframe.startDate.toISOString(), timeframe.endDate.toISOString()],
    queryFn: async () => {
      const res = await api.get("/event/month-events", {
        params: {
          timeframe: JSON.stringify(timeframe),
        },
      });
      console.log(res);
      return res.data;
    }
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

  const events = data?.events ?? [];

  return {
    events,
    onDateChange,
    eventActions,
    eventDetailsControl,
    timeframe,
    isFetchingEvents,
  };
};
