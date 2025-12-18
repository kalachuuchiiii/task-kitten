import type { DialogProps } from "@radix-ui/react-dialog";
import { useEventActions } from "../hooks"
import { EventFormFields } from "./EventFormFields"


export const UpdateEventForm = ({...props }: DialogProps) => {
    
    const { formControl, actions: { createEvent, isCreatingEvent } } = useEventActions();

    return <div className="w-full flex items-center justify-center">
          <EventFormFields  {...formControl} {...props} >
            <button
              disabled={isCreatingEvent}
              onClick={() => createEvent()}
              className="button-bg w-full p-1.5"
            >
              Create
            </button>
          </EventFormFields>
        </div>
}