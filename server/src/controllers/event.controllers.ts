import { EventService } from "@/services/event.services";
import { excludeTime } from "@/utils/date";
import { EVENT_TITLE_LIMIT } from "@shared/constants";
import { RequestHandler } from "express";
import { size } from "lodash";
import z  from "zod";

const eventService = new EventService();

const processDate = (val: string | Date) => {
  if(typeof val === 'string')return new Date(val);
  if(val instanceof Date)return val;
  return val;
}

const eventTimeframeSchema = z
  .object({
    startDate: z.preprocess(excludeTime, z.date() ),
    endDate: z.preprocess(excludeTime, z.date() )
  })
  .strip();

const eventFormSchema = z
  .object({
    title: z.string().max(EVENT_TITLE_LIMIT.LENGTH, EVENT_TITLE_LIMIT.MESSAGE),
    start: z.preprocess(processDate, z.date()),
    description: z.string(),
    end: z.preprocess(processDate, z.date()).optional(),
  })
  .strip();


export class EventController { 


  //PATCH /event/update/:eventId
  updateEvent: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const eventId = z.string().parse(req.params.eventId);
    const eventForm = eventFormSchema.parse(req.body.eventForm);
    const update = await eventService.updateEvent({ userId, eventId, eventForm });
    return res.status(200).json({
      success: true,
      update
    })
  }

  //DELETE /event/delete/:eventid
  deleteEvent: RequestHandler = async(req, res) => {
    const userId = z.string().parse(req.user);
    const eventId = z.string().parse(req.params.eventId);
    const deleted = await eventService.deleteEvent({ userId, eventId });
    return res.status(200).json({
      success: true,
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
    });
  };

  //GET /event/month-events
  getMonthEvents: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.user);
    const { startDate, endDate } = eventTimeframeSchema.parse(JSON.parse(req.query.timeframe as string || '{}'));
    const events = await eventService.getMonthEvents({ startDate, endDate, userId });

    return res.status(200).json({
      success: true,
      ...events,
    });
  };
}
