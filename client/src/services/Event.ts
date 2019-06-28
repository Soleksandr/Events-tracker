// @TODO refactor this file
import { DateTime } from "luxon";
import { IEventSchema } from "sdk";

interface IDateDescriptor extends Pick<IEventSchema,
"isDailyEvent" |
"monthDays" |
"months" |
"onceInAYearNumber" |
"weekDays" |
"weeksInAMonth"
> {}

export class Event {
  private  now: DateTime;
  private createdAt: DateTime;
  private dateDescriptor: IDateDescriptor
  private commonEventData: {
    id: any;
    createdAt: IEventSchema["createdAt"];
    title: IEventSchema["description"];
  }
  private eventTime: {
    hour: DateTime["hour"];
    minute: DateTime["minute"];
    second: DateTime["second"];
  };

  constructor ({ createdAt, description, _id, eventTime, ...dateData }: IEventSchema) {
    this.commonEventData = {
      id: _id,
      createdAt: this.formatDate(createdAt),
      title: description
    };
    this.dateDescriptor = dateData;
    this.createdAt = DateTime.fromISO(createdAt);
    this.eventTime = this.getTime(DateTime.fromISO(eventTime, { zone: "utc" }));
    this.now = DateTime.local().toUTC();
  }

  public getEvent () {
    if (this.dateDescriptor.isDailyEvent) {
      return this.getFullEventData(this.handleDailyEvent());
    }
    const nextEventYearTime = this.now.set(this.eventTime);

    return this.getEventDate(nextEventYearTime);
  }

  private getEventDate (nextEventYearTime: DateTime): any {
    let date: DateTime | null = null;

    this.dateDescriptor.months.some(month => {
      if (nextEventYearTime.hasSame(this.now, "year")) {
        if (month + 1 === this.now.month) {
          date = this.getDateForCurrentMonth(nextEventYearTime.set({ month: month + 1 }));
        }

        if (month + 1 > this.now.month) {
          date = this.getDateForFutureMonth(nextEventYearTime.set({ month: month + 1 }));
        }
      } else {
        date = this.getDateForFutureYear(nextEventYearTime.set({ month: month + 1 }));
      }

      return !!date;
    });

    return date
      ? this.getFullEventData(date)
      : this.getEventDate(this.now.plus({ year: 1 }).set({ ...this.eventTime }));
  }

  private getDateForCurrentMonth (nextEventYearMonthTime: DateTime) {
    let nextEventDay = null;

    // case when days of a month are specified
    if (this.dateDescriptor.monthDays.length) {
      nextEventDay = this.dateDescriptor.monthDays.find(monthDay => monthDay === nextEventYearMonthTime.day);

      // event will be today and time does not come yet
      if (nextEventDay && nextEventYearMonthTime.diffNow().milliseconds > 0) {
        return nextEventYearMonthTime.set({ day: nextEventDay });
      }

      // event will be other day this month
      nextEventDay = this.dateDescriptor.monthDays.find(monthDay => monthDay > nextEventYearMonthTime.day);

      if (nextEventDay) {
        return nextEventYearMonthTime.set({ day: nextEventDay });
      }

      // all events for this month are finished
      return null;
    }

    // case when days in a week and week in a month are specified
    if (this.dateDescriptor.weekDays && this.dateDescriptor.weeksInAMonth) {
      const currentWeekNumber = Math.ceil((this.now.day + this.now.set({ day: 1 }).weekday) / 7);

      // as we can guarantee that any week day is repeated 4 times
      if (currentWeekNumber > 4) {
        return null;
      }

      const currentWeekEvent = this.dateDescriptor.weeksInAMonth.find(weekInAMonth => weekInAMonth + 1 === currentWeekNumber);

      // check week day for current week
      if (currentWeekEvent) {
        let weekDay = nextEventYearMonthTime.diff(this.now).milliseconds > 0 &&
          this.dateDescriptor.weekDays.find(day => day + 1 === nextEventYearMonthTime.weekday);

        // current week day is one from the specified and event time does not come yet
        if (weekDay) {
          return nextEventYearMonthTime;
        }

        weekDay = this.dateDescriptor.weekDays.find(day => day + 1 > nextEventYearMonthTime.weekday);

        // next event date later this week
        if (weekDay) {
          return nextEventYearMonthTime.set({ day: this.now.day + (weekDay + 1 - this.now.weekday) });
        }
      }

      const weekNumberEvent = this.dateDescriptor.weeksInAMonth.find(weekInAMonth => weekInAMonth + 1 > currentWeekNumber);

      // event will happen later this month
      if (weekNumberEvent) {
        const daysLeftToWeekEnd = 7 - this.now.weekday;
        const weeksLeftToEvent = weekNumberEvent + 1 - currentWeekNumber;

        return nextEventYearMonthTime.set({
          day: this.now.day + daysLeftToWeekEnd + weeksLeftToEvent + this.dateDescriptor.weekDays[0]
        });
      }
      // all events for this month finished
      return null;
    }

    // line below is a temporal
    return nextEventYearMonthTime;
  }

  private getDateForFutureMonth (nextEventYearMonthTime: DateTime) {
    if (this.dateDescriptor.monthDays.length) {
      return nextEventYearMonthTime.set({ day: this.dateDescriptor.monthDays[0] });
    }

    if (this.dateDescriptor.weekDays && this.dateDescriptor.weeksInAMonth) {
      return nextEventYearMonthTime.set({
        day: nextEventYearMonthTime.set({ day: 1 }).weekday > this.dateDescriptor.weekDays[0]
          ? (this.dateDescriptor.weeksInAMonth[0] + 2) * 7 - (nextEventYearMonthTime.set({ day: 1 }).weekday - this.dateDescriptor.weekDays[0])
          : (this.dateDescriptor.weeksInAMonth[0] + 1) * 7 - (this.dateDescriptor.weekDays[0] - nextEventYearMonthTime.set({ day: 1 }).weekday)
      });
    }

    // temporal
    return nextEventYearMonthTime;
  }

  private getDateForFutureYear (nextEventYearMonthTime: DateTime) {
    if (this.dateDescriptor.monthDays.length) {
      return nextEventYearMonthTime.set({ day: this.dateDescriptor.monthDays[0] });
    }

    if (this.dateDescriptor.weekDays && this.dateDescriptor.weeksInAMonth) {
      return nextEventYearMonthTime.set({
        day: (this.dateDescriptor.weeksInAMonth[0] + 1) * 7 - (7 - this.dateDescriptor.weekDays[0] + 1)
      });
    }

    // temporal
    return nextEventYearMonthTime;
  }

  private handleDailyEvent () {
    const diff = this.now.diff(this.createdAt.set(this.eventTime), [ "hours" ]);
    // @TODO simplify this
    console.log("diff = ", diff);
    return diff.hours < 0
      ? this.now.set(this.eventTime)
      : this.now.set({
        ...this.eventTime,
        day: this.now.plus({
          day: this.createdAt.diffNow("millisecond").milliseconds > 0
            ? this.createdAt.day
            : 1
        }).day
      });
  }

  private getFullEventData (nextEventDate: DateTime) {
    return {
      ...this.commonEventData,
      nextEventDate: nextEventDate.toLocal().toRFC2822()
    };
  }

  private formatDate (date: DateTime | string) {
    if (typeof date === "string") {
      return DateTime.fromISO(date).toLocal().toRFC2822();
    }

    return date.toLocal().toRFC2822();
  }

  private getTime (date: DateTime) {
    return {
      hour: date.hour,
      minute: date.minute,
      second: date.second,
    };
  }
}