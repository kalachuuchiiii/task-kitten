import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { CalendarCogIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { formatDate } from "@shared/utils";
import { useContext } from "react";
import { EventCalendarContext } from "../context";
import { EventFormFields } from "./EventFormFields";

export const CreateNewEvent = () => {
  const eventContext = useContext(EventCalendarContext);
  if (!eventContext) return null;
  const {
    formControl,
    actions: { isCreatingEvent, createEvent },
  } = eventContext;

  return (
    <div className="w-full flex items-center justify-center">
     <Sheet>
      <SheetTrigger>
        <button className="flex items-center gap-2 button-bg px-5 py-2">
          <CalendarCogIcon /> <p>New Event</p>
        </button>
      </SheetTrigger>
        <EventFormFields {...formControl}>
        <button
          disabled={isCreatingEvent}
          onClick={() => createEvent()}
          className="button-bg w-full p-1.5"
        >
          Create
        </button>
      </EventFormFields>
     </Sheet>
    </div>
  );
};
