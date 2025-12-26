import { useApi } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useEventActions } from "./useEventActions";

export const useEventCalendar = () => {
  const api = useApi();
  const [timeframe, setTimeframe] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  });
  const eventActions = useEventActions();

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


  const events = data?.events ?? [];

  return {
    events,
    onDateChange,
    eventActions,
    timeframe,
    isFetchingEvents,
  };
};
