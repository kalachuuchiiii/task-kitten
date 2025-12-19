import { EventFormFields } from "./EventFormFields";
import { useContext } from "react";
import { EventCalendarContext } from "../context";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";

export const EventDetails = () => {
  const eventCalendarContext = useContext(EventCalendarContext);
  if (!eventCalendarContext) return null;
  const {
    formControl,
    selectedEvent,
    actions: { updateEvent, isUpdatingEvent, deleteEvent, isDeletingEvent },
  } = eventCalendarContext;

  return (
    <EventFormFields title="Details" {...formControl}>
      <div className="flex items-center justify-center gap-1 w-full flex-col">
        <button
          onClick={() => updateEvent(selectedEvent._id)}
          disabled={isUpdatingEvent}
          className="button-bg p-2 w-full "
        >
          Update
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild className="w-full p-2">
            <button
            
            >
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>
                <p>Delete Event</p>
            </AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to delete this event? This can't be undone
            </AlertDialogDescription>
            <AlertDialogFooter className="flex items-center gap-1">
                <AlertDialogCancel asChild className="button-bg">
                    <button>
                        Cancel
                    </button>
                </AlertDialogCancel>
                <Button onClick={() => deleteEvent(selectedEvent._id)} disabled = {isDeletingEvent} variant={'ghost'}>
                    Delete
                </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </EventFormFields>
  );
};
