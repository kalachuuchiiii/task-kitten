import { PageLayout } from "@/components/layout/PageLayout"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';



const EventCalendar = () => {
  return (
   <div>
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