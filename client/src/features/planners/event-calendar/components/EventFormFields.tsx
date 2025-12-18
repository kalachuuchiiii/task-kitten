import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "@/components/ui/item"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@shared/utils"
import { CalendarClockIcon, CalendarCogIcon, Plus } from "lucide-react"
import type { JSX } from "react"
import type { TextChangeEvent } from "../../todo-task"
import type { useEventActions } from "../hooks"
import type { DialogProps } from "@radix-ui/react-dialog"

type EventFormFieldProps = ReturnType<typeof useEventActions>['formControl'] & { children: JSX.Element; title?: string; } & DialogProps; 

export const EventFormFields = ({  eventForm,  children, handleSetEventTitle, handleSetTimeframe, title = 'New Event', ...props }: EventFormFieldProps) => {

    return ( 
        <SheetContent className="p-3">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
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
              { children }
            </SheetFooter>
          </div>
        </SheetContent>)
}