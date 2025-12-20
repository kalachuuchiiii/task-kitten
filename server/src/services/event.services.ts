import { Event } from "@/models/event";
import { NotFoundError } from "@/utils/errors";
import { EventForm } from "@shared/types";

export class EventService {

  deleteEvent = async({ userId, eventId }: { userId: string; eventId: string}) => {
    const event = (await Event.findById(eventId).orFail(new NotFoundError('Event not found.'))).verifyOwner(userId);
    const deleted = await event.deleteOne();
    return deleted;
  }

  updateEvent = async({ userId, eventId, eventForm }: {userId: string; eventId: string; eventForm: EventForm}) => {
     const event = (await Event.findById(eventId).orFail(new NotFoundError('Event not found.'))).verifyOwner(userId);
     const updatedEvent = await event.updateOne({ ...eventForm }, { new: true });
     return updatedEvent;
  }

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
    end,
    start,
    userId
  }: {
    end: Date;
    start: Date;
    userId: string;
  }) => {
    const query = {
      userId,
      $or: [
        { start: { $gte: start, $lt: end } },
        { end: { $gte: start, $lt: end } },
      ],
    };
    const [events, totalEvents] = await Promise.all([Event.find(query), Event.countDocuments(query)]);
    return {
        events, totalEvents
    }
  };
}
