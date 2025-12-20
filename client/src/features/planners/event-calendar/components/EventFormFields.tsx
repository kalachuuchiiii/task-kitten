import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@shared/utils";
import { CalendarCogIcon } from "lucide-react";
import type { FormHTMLAttributes, JSX } from "react";
import type { useEventActions } from "../hooks";
import { Input } from "@/components/ui/input";
import { EVENT_LIMIT } from "@shared/limits";

type EventFormFieldProps = ReturnType<typeof useEventActions>["formControl"] & {
  title?: string;
};

export const EventFormFields = ({
  eventForm,
  handleSetEventText,
  handleSetTimeframe,
  title = "New Event",
  ...props
}: EventFormFieldProps & FormHTMLAttributes<HTMLFormElement>) => {
  const { title: eventTitle, description } = EVENT_LIMIT;
  return (
    <form {...props}>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>Event Calendar</SheetDescription>
      </SheetHeader>
      <div className="w-full flex flex-col items-center gap-3 justify-center ">
        <div className="w-11/12 mx-auto space-y-2">
          <Input
            className="w-full"
            value={eventForm.title}
            name="title"
            required 
            minLength={eventTitle.MIN}
            maxLength={eventTitle.MAX}
            onChange={handleSetEventText}
            placeholder="Event name"
          />
          <Textarea
            className="w-full"
            value={eventForm.description}
            onChange={handleSetEventText}
            minLength={description.MIN}
            maxLength={description.MAX}
            name="description"
            required
            placeholder="Event description"
          />
        </div>
        <div>
          <Item>
            <ItemContent>
              <ItemTitle>Date</ItemTitle>
              <ItemDescription>When will the event take place</ItemDescription>
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
                    onSelect={handleSetTimeframe("start")}
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
                    onSelect={handleSetTimeframe("end")}
                    selected={eventForm.end}
                    showOutsideDays={false}
                    mode="single"
                  />
                </DialogContent>
              </Dialog>
            </ItemActions>
            <ItemFooter>
              <ItemDescription className="text-xs px-2 py-1 rounded-xl bg-muted">
                {eventForm.end ? (
                  <p>Will end in {formatDate(eventForm.end)}</p>
                ) : (
                  <p>Not specified</p>
                )}
              </ItemDescription>
            </ItemFooter>
          </Item>
        </div>
      </div>
    </form>
  );
};
