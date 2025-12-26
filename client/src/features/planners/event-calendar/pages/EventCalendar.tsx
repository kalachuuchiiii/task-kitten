import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useEventCalendar, useEventDetails } from "../hooks";
import { EventCalendarContext } from "../context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EventDetails } from "../components/EventDetails";
import { PageLayout } from "@/components/layout/PageLayout";
import { CalendarCogIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEventForm } from "../hooks/useEventForm";

const EventCalendar = () => {
  const {
    events,
    onDateChange,
    timeframe,
    eventActions,
  } = useEventCalendar();
  const eventFormControl =  useEventForm();
  const { setEventForm } = eventFormControl; 
  const { isDetailSheetOpen, onOpenChange, openDetailSheet, selectedEvent, onEventClick } = useEventDetails(setEventForm);
  const { t } = useTranslation();
  const { actions, eventCalendarRef } = eventActions;



  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <Sheet>
          <SheetTrigger>
            <button className="flex items-center gap-2 button-bg px-5 py-2">
              <CalendarCogIcon /> <p>{t('event.action.create')}</p>
            </button>
          </SheetTrigger>
          <CreateNewEvent />
        </Sheet>
      </div>

      <FullCalendar
        events={events}
        ref={eventCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        showNonCurrentDates={false}
        initialDate={timeframe.start}
        datesSet={onDateChange}
        eventDidMount={(info) => {
          info.event.setAllDay(true);
        }}
        height="100vh"
        eventClick={onEventClick}
      />
      <Sheet open={isDetailSheetOpen} onOpenChange={onOpenChange}>
        <EventCalendarContext value={{ eventFormControl, actions, selectedEvent }}>
          <SheetContent className="p-3">
            <EventDetails />
          </SheetContent>
        </EventCalendarContext>
      </Sheet>
    </div>
  );
};

export default EventCalendar;
