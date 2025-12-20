import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useEventCalendar } from "../hooks";
import { EventCalendarContext } from "../context";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EventDetails } from "../components/EventDetails";



const EventCalendar = () => {
  const {
    events,
    onDateChange,
    timeframe,
    eventActions,
    eventDetailsControl: { isDetailSheetOpen, onOpenChange, selectedEvent, handleEventClick },
  } = useEventCalendar();
    const { formControl, actions, eventCalendarRef } = eventActions;
 
  return (
    <div>
      <CreateNewEvent />
      <FullCalendar
        events={events}
        ref={eventCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        initialDate={timeframe.start}
        datesSet={onDateChange}
        height="100vh"
        eventClick={handleEventClick}
      />
      <Sheet open = {isDetailSheetOpen} onOpenChange={onOpenChange}>
        <EventCalendarContext value={{ formControl, actions, selectedEvent }}>
           <SheetContent className="p-3">
                <EventDetails /> 
           </SheetContent>
        </EventCalendarContext>
      </Sheet>
    </div>
  );
};

export default EventCalendar;
