
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
 
  );
};
