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


export const CreateNewEvent = () => {
  const eventContext = useContext(EventCalendarContext);
  if(!eventContext)return null;
  const { eventForm, handleSetTimeframe, handleSetEventTitle, createEvent, isCreatingEvent } = eventContext

  return (
    <div className="w-full flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <button className="button-bg flex items-center gap-2 px-4 py-1.5">
            <Plus /> New event
          </button>
        </SheetTrigger>
        <SheetContent className="p-3">
          <SheetHeader>
            <SheetTitle>New Event</SheetTitle>
            <SheetDescription>Event Calendar</SheetDescription>
          </SheetHeader>
          <div className="w-full space-y-3">
            <Textarea
              className="w-11/12 mx-auto"
              value={eventForm.title}
              onChange={handleSetEventTitle}
              placeholder="Event name"
            />
            <Item>
              <ItemContent>
                <ItemTitle>Date</ItemTitle>
                <ItemDescription>
                  When will the event take place
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Dialog>
                  <DialogTrigger>
                    <Button variant={"ghost"}>
                      <CalendarCogIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-fit flex items-center flex-col justify-center">
                    <DialogTitle>Start date</DialogTitle>
                    <Calendar
                      onSelect={handleSetTimeframe('start')}
                      selected={eventForm.start}
                      showOutsideDays={false}
                      mode="single"
                    />
                  </DialogContent>
                </Dialog>
              </ItemActions>
              <ItemFooter>
                <ItemDescription className="text-xs px-2 py-1 rounded-xl bg-muted">
                  Will take place in {formatDate(eventForm.start)}
                </ItemDescription>
              </ItemFooter>
            </Item>
            <Item>
              <ItemContent>
                <ItemTitle>
                  <p>End</p> <span className="opacity-60">( optional )</span>
                </ItemTitle>
                <ItemDescription>When will the event end</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Dialog>
                  <DialogTrigger>
                    <Button variant={"ghost"}>
                      <CalendarCogIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-fit flex items-center flex-col justify-center">
                    <DialogTitle>End date</DialogTitle>
                    <Calendar
                      onSelect={handleSetTimeframe('end')}
                      selected={eventForm.end}
                      showOutsideDays={false}
                      mode = 'single'
                    />
                  </DialogContent>
                </Dialog>
              </ItemActions>
              <ItemFooter>
                <ItemDescription className="text-xs px-2 py-1 rounded-xl bg-muted">
                  { eventForm.end ? <p>Will end in {formatDate(eventForm.end)}</p> : <p>Not specified</p>}
                </ItemDescription>
              </ItemFooter>
            </Item>
            <SheetFooter>
              <button disabled = {isCreatingEvent} onClick={() => createEvent()} className="button-bg w-full p-1.5">Create</button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
