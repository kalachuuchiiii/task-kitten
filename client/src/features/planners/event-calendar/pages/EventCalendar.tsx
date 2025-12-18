import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useQuery } from "@tanstack/react-query";
import { useEventCalendar } from "../hooks";
import { EventCalendarContext } from "../context";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventFields, EventForm } from "@shared/types";
import { formatDate } from "@shared/utils";
import { ChevronRight } from "lucide-react";

const EventCalendar = () => {
  const {
    events,
    isFetchingEvents,
    onDateChange,
    timeframe,
    eventActions,
    eventDetailsControl,
  } = useEventCalendar();
  const { eventCalendarRef } = eventActions;
  const { onOpenChange, isDialogOpen, openModal, selectedEvent } =
    eventDetailsControl;

  return (
    <div>
      <EventCalendarContext.Provider value={{ ...eventActions }}>
        <CreateNewEvent />
      </EventCalendarContext.Provider>

      <FullCalendar
        events={events}
        ref={eventCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        initialDate={timeframe.startDate}
        datesSet={onDateChange}
        height="100vh"
        eventClick={(info) => {
          console.log(info);
          const eventObj: EventForm = {
            title: info.event._def.title,
            start: info.event._instance?.range.start ?? new Date(),
            description: info.event._def.extendedProps?.description ?? '', 
            end: info.event._instance?.range.end ?? undefined,
          };
          openModal(eventObj);
        }}
      />
      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Event Details</DialogTitle>
          <DialogDescription>{selectedEvent.title}</DialogDescription>
           <DialogDescription>{selectedEvent.description}</DialogDescription>
          <div className="flex items-center gap-2">
            <p>{formatDate(selectedEvent.start)}</p>
            {selectedEvent.end && (
              <>
                {" "}
                <ChevronRight size = '20' />
                <p>{formatDate(selectedEvent.end)}</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
