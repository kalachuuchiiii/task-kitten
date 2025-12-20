
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CalendarCogIcon } from "lucide-react";
import { useContext } from "react";
import { EventCalendarContext } from "../context";
import { EventFormFields } from "./EventFormFields";
import { useEventActions } from "../hooks";

export const CreateNewEvent = () => {
  const {
    formControl,
    actions: { isCreatingEvent, createEvent },
  } = useEventActions();

  return (
    <div className="w-full flex items-center justify-center">
     <Sheet>
      <SheetTrigger>
        <button className="flex items-center gap-2 button-bg px-5 py-2">
          <CalendarCogIcon /> <p>New Event</p>
        </button>
      </SheetTrigger>
       <SheetContent className="p-3">
         <EventFormFields onSubmit={createEvent} id = 'create-event' {...formControl} />
         <button
          disabled={isCreatingEvent}
          form = 'create-event'
          className="button-bg w-full p-2"
        >
          Create
        </button>
       </SheetContent>
     </Sheet>
    </div>
  );
};
