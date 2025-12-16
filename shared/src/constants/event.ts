import { Limiter } from "./task";


export const EVENT_TITLE_LIMIT: Limiter = {
    LENGTH: 26,
    MESSAGE: 'Event name must be 1-60 characters.'
}