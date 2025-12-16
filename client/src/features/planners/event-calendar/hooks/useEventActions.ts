import { useState } from "react"
import type { TextChangeEvent } from "../../todo-task";


export const useEventActions = () => {

    const [eventForm, setEventForm] = useState<{event: string; when: Date}>({
        event: '',
        when: new Date()
    })

    const handleSetWhen = (date: Date | undefined) => {
       if(!date)return;
       setEventForm((prev) => ({
        ...prev,
        when: date
       }))
    }

    const handleSetEventName = (e: TextChangeEvent) => {
        const { value } = e.target;
        setEventForm((prev) => ({
            ...prev,
            event: value
        }))
    }

    return {
        handleSetWhen,
        eventForm,
        handleSetEventName
    }
}