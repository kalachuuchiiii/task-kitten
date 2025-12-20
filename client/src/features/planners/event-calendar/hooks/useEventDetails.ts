import { createEventFormDefault } from "@shared/defaults";
import type { EventFields, EventForm, EventUpdateFormFields } from "@shared/types";
import { useState } from "react";

export const useEventDetails = () => {
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

  

  return { 
    onOpenChange,
    openDetailSheet,
    selectedEvent,
    isDetailSheetOpen
  }

  
};
