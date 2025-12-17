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
    endDate,
    startDate,
    userId,
  }: {
    endDate: Date;
    startDate: Date;
    userId: string;
  }) => {
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
