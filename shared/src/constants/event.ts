import { Limiter } from "./task";


export const EVENT_TITLE_LIMIT: Limiter = {
    LENGTH: 26,
    MESSAGE: 'Event name must be 1-60 characters.'
}

export const EVENT_DESCRIPTION_LIMIT: Limiter = {
    LENGTH: 300,
    MESSAGE: 'Description must be 1-300 characters.'
}

