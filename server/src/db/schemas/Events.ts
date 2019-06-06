import { Schema } from "mongoose";
import { IEventSchema, USERS } from "sdk";

const asc = (a: number, b: number) => a - b;

export const eventsSchema = new Schema<IEventSchema>({
  description: { type: String, required: true },
  eventTime: { type: Date, required: true },
  isDailyEvent: { type: Boolean, default: false },
  weekDays: [ { type: Number } ],
  weeksInAMonth: [ { type: Number } ],
  months: [ { type: Number } ],
  monthDays: [ { type: Number } ],
  onceInAYearNumber: { type: Number },
  user: {
    type: Schema.Types.ObjectId,
    ref: USERS
  },
}, {
  timestamps: true,
  versionKey: false
});

eventsSchema.pre<IEventSchema>("save", function(next) {
  this.weekDays = this.weekDays.sort(asc);
  this.monthDays = this.monthDays.sort(asc);
  this.months = this.months.sort(asc);
  this.weekDays = this.weekDays.sort(asc);

  next();
});
