
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemTitle } from "@/components/ui/item";
import { CalendarCogIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEventActions } from "../hooks";
import { formatDate } from "@shared/utils";
import { daysBetween } from "@/utils";



export const CreateNewEvent = () => {
    const { eventForm, handleSetEventName, handleSetWhen } = useEventActions();
    return (
         <div className="w-full flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild >
          <button className="button-bg flex items-center gap-2 px-4 py-1.5">
           <Plus />   New event 
          </button>
        </SheetTrigger>
        <SheetContent className="p-3">
          <SheetHeader>
            <SheetTitle>New Event</SheetTitle>
            <SheetDescription>
                Event Calendar
            </SheetDescription>
          </SheetHeader>
          <div className="w-full space-y-3">
            <Textarea className="w-11/12 mx-auto" value = {eventForm.event} onChange={handleSetEventName} placeholder="Event name" />
            <Item>
              <ItemContent>
                <ItemTitle>
                  Date
                </ItemTitle>
                <ItemDescription>
                  When will the event take place    
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                
                   <Dialog>
                    <DialogTrigger>
                      <Button variant={'ghost'}>
                       <CalendarCogIcon />
                       </Button>
                    </DialogTrigger>
                    <DialogContent className="w-fit flex items-center flex-col justify-center" >
                      <DialogTitle >Event Date</DialogTitle>
                      <Calendar onSelect={handleSetWhen} selected={eventForm.when} showOutsideDays = {false} mode = 'single' />
                    </DialogContent>
                   </Dialog>
              
              </ItemActions>
              <ItemFooter>
                   <ItemDescription className="text-xs px-2 py-1 rounded-xl bg-muted" >
                Will take place in {formatDate(eventForm.when)} 
            </ItemDescription>
              </ItemFooter>
            </Item>
             <SheetFooter>
                <button className="button-bg w-full p-1.5">
              Create
            </button>
             </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    )
}