
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CreateNewEvent } from "../components/CreateNewEvent";


const EventCalendar = () => {
  return (
   <div>
      <CreateNewEvent />
      <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100vh"
     
      dateClick={(info) => {
        console.log("Clicked date:", info.dateStr);
      }}
      eventClick={(info) => {
        console.log("Clicked event:", info.event);
      }}
    />
   </div>
  )
}

export default EventCalendar