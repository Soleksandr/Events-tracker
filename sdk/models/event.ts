import { Document } from "mongoose";
import { Week, WeeksInAMonth, Months } from "../constants";


export interface IEvent {
  description: string;
  // eventStartDate: string | null;
  isDailyEvent: boolean;
  eventTime: string | null;
  weekDays: Week[];
  weeksInAMonth: WeeksInAMonth[];
  months: Months[];
  monthDays: number[];
  onceInAYearNumber: number;
}

export interface IEventSchema extends IEvent, Document {
  createdAt: string;
  eventStartDate: string;
  eventTime: string;
}