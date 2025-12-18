import { createEventFormDefault } from "@shared/defaults";
import type { EventForm } from "@shared/types";
import { useState } from "react";

export const useEventDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventForm>(createEventFormDefault());

  const onOpenChange = (val: boolean) => {
    if(val === false){
       setSelectedEvent(createEventFormDefault());
    }
    setIsDialogOpen(val);
  }

  const openModal = (event: EventForm) => {
     setSelectedEvent(event);
     setIsDialogOpen(true);
  }

  return { 
    onOpenChange,
    openModal,
    selectedEvent,
    isDialogOpen
  }

  
};
