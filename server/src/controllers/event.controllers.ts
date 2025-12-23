import { EventService } from "@/services/event.services";
import { eventFormSchema, eventTimeframeSchema } from "@shared/schema";
import { RequestHandler } from "express";
import z  from "zod";

const eventService = new EventService();
export class EventController { 


  //PATCH /event/update/:eventId
  updateEvent: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const eventId = z.string().parse(req.params.eventId);
    const eventForm = eventFormSchema.parse(req.body.eventForm);
    const update = await eventService.updateEvent({ userId, eventId, eventForm });
    return res.status(200).json({
      success: true,
      update,
      code: 'event.updated'
    })
  }

  //DELETE /event/delete/:eventid
  deleteEvent: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const eventId = z.string().parse(req.params.eventId);
    const deleted = await eventService.deleteEvent({ userId, eventId });
    return res.status(200).json({
      success: true,
      code: 'event.deleted',
      deleted
    })

  }
  //POST /event/create
  createEvent: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const eventForm = eventFormSchema.parse(req.body.eventForm);
    const newEvent = await eventService.createEvent({ eventForm, userId });
    return res.status(200).json({
      success: true,
      newEvent,
      code: 'event.created'
    });
  };

  //GET /event/month-events
  getMonthEvents: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const { start, end } = eventTimeframeSchema.parse(JSON.parse(req.query.timeframe as string || '{}'));
    const events = await eventService.getMonthEvents({ start, end, userId });

    return res.status(200).json({
      success: true,
      ...events,
    });
  };
}
