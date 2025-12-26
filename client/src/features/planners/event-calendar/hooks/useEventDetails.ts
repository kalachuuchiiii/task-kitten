import { createEventFormDefault } from "@shared/defaults";
import type { EventFields, EventForm, EventUpdateFormFields } from "@shared/types";
import { useState } from "react";
import type { EventClickArg } from "@fullcalendar/core";

export const useEventDetails = (setEventForm: (val: EventForm) => void) => {
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventUpdateFormFields>({ ...createEventFormDefault(), _id: ''});
   
  const onOpenChange = (val: boolean) => {
    if(val === false){
       setSelectedEvent({...createEventFormDefault(), _id: ''});
    }
    setIsDetailSheetOpen(val);
  }

  const openDetailSheet = (event: EventUpdateFormFields) => {
     setSelectedEvent(event);
     setIsDetailSheetOpen(true);
  }

  
  const onEventClick = (info: EventClickArg) => {
    const eventObj: EventUpdateFormFields & { allDay: boolean }= {
      title: info.event._def.title,
      _id: info.event._def.extendedProps._id,
      start: info.event._instance?.range.start ?? new Date(),
      description: info.event._def.extendedProps?.description ?? "",
      end: info.event._instance?.range.end ?? undefined,
      allDay: true
    };
    setEventForm(eventObj);
    openDetailSheet(eventObj);
  };
  

  return { 
    onOpenChange,
    openDetailSheet,
    selectedEvent,
    onEventClick,
    isDetailSheetOpen
  }

  
};
