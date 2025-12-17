import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useQuery } from "@tanstack/react-query";
import { useEventCalendar } from "../hooks";
import { EventCalendarContext } from "../context";

const EventCalendar = () => {
  const { events, isFetchingEvents, eventCalendarRef, onDateChange, timeframe, actions } = useEventCalendar();
  
  return (
    <div>
      <EventCalendarContext.Provider value = {{...actions}}>
         <CreateNewEvent />
      </EventCalendarContext.Provider>
     
      <FullCalendar
      events={events}
      ref={eventCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" 
        showNonCurrentDates = {false}
        initialDate={timeframe.startDate}
        datesSet={onDateChange}
        height="100vh"
        dateClick={(info) => {
          console.log("Clicked date:", info.dateStr);
        }}
        eventClick={(info) => {
          console.log("Clicked event:", info.event);
        }}
      />
    </div>
  );
};

export default EventCalendar;
