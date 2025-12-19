import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useEventCalendar } from "../hooks";
import { EventCalendarContext } from "../context";
import { Sheet } from "@/components/ui/sheet";
import { EventDetails } from "../components/EventDetails";
import type { EventUpdateFormFields } from "@shared/types";

const EventCalendar = () => {
  const {
    events,
    onDateChange,
    timeframe,
    eventActions,
    eventDetailsControl: { isDetailSheetOpen, openDetailSheet, onOpenChange, selectedEvent },
  } = useEventCalendar();
    const { formControl, actions, eventCalendarRef } = eventActions;
    const { setEventForm } = formControl;
 

  return (
    <div>
      <CreateNewEvent />
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
          const eventObj: EventUpdateFormFields = {
            title: info.event._def.title,
            _id: info.event._def.extendedProps._id,
            start: info.event._instance?.range.start ?? new Date(),
            description: info.event._def.extendedProps?.description ?? "",
            end: info.event._instance?.range.end ?? undefined,
          };
          setEventForm(eventObj);
          openDetailSheet(eventObj);
        }}
      />
      <Sheet open = {isDetailSheetOpen} onOpenChange={onOpenChange}>
        <EventCalendarContext value={{ formControl, actions, selectedEvent }}>
          <EventDetails /> 
        </EventCalendarContext>
      </Sheet>
    </div>
  );
};

export default EventCalendar;
