import { EventService } from "@/services/event.services";
import { excludeTime } from "@/utils/date";
import { EVENT_TITLE_LIMIT } from "@shared/constants";
import { RequestHandler } from "express";
import z, { success } from "zod";

const eventService = new EventService();

const eventTimeframeSchema = z.object({
    year: z.number(),
    month: z.number()
}).strip();

const eventFormSchema = z.object({
  title: z.string().max(EVENT_TITLE_LIMIT.LENGTH, EVENT_TITLE_LIMIT.MESSAGE),
  start: z.preprocess(excludeTime, z.date()),
  end: z.preprocess(excludeTime, z.date()).optional(),
}).strip();

export class EventController {
  //POST /event/create
  createEvent: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const eventForm = eventFormSchema.parse(req.body.eventForm);
    const newEvent = await eventService.createEvent({ eventForm, userId });
    return res.status(200).json({
      success: true,
      newEvent,
    });
  };


  //GET /event/month-events
  getMonthEvents: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const { month, year } = eventTimeframeSchema.parse(req.body.timeframe);
    const events = await eventService.getMonthEvents({ year, month, userId });

    return res.status(200).json({
        success: true,
        ...events
    })

  };
}
