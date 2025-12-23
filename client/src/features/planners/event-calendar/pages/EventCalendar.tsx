import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CreateNewEvent } from "../components/CreateNewEvent";
import { useEventCalendar } from "../hooks";
import { EventCalendarContext } from "../context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EventDetails } from "../components/EventDetails";
import { PageLayout } from "@/components/layout/PageLayout";
import { CalendarCogIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const EventCalendar = () => {
  const {
    events,
    onDateChange,
    timeframe,
    eventActions,
    eventDetailsControl: {
      isDetailSheetOpen,
      onOpenChange,
      selectedEvent,
      handleEventClick,
    },
  } = useEventCalendar();
  const { t } = useTranslation();
  const { formControl, actions, eventCalendarRef } = eventActions;

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
        eventClick={handleEventClick}
      />
      <Sheet open={isDetailSheetOpen} onOpenChange={onOpenChange}>
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
