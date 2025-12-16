import { Event } from "@/models/event";
import { EventForm } from "@shared/types";

export class EventService {
  createEvent = async ({
    eventForm,
    userId,
  }: {
    eventForm: EventForm;
    userId: string;
  }) => {
    const event = await new Event({ ...eventForm, userId }).save();
    return event;
  };

  getMonthEvents = async ({
    year,
    month,
    userId,
  }: {
    year: number;
    month: number;
    userId: string;
  }) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const query = {
      userId,
      $or: [
        { start: { $gte: startDate, $lt: endDate } },
        { end: { $gte: startDate, $lt: endDate } },
      ],
    };
    const [events, totalEvents] = await Promise.all([Event.find(query), Event.countDocuments(query)]);
    return {
        events, totalEvents
    }
  };
}
