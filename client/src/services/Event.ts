import { DateTime } from "luxon";
import { IEventSchema } from "sdk";

interface IDateDescriptor extends Pick<IEventSchema,
// "createdAt" |
// "eventTime" |
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
    console.log("----- eventTime ------- ", eventTime);
    this.dateDescriptor = dateData;
    this.createdAt = DateTime.fromISO(createdAt);
    this.eventTime = this.getTime(DateTime.fromISO(eventTime, { zone: "utc" }));
    this.now = DateTime.local().toUTC();
    console.log("------this.eventTime------ ", this.eventTime);
  }

  public getEvent () {
    const dateWithProperTime = this.setTime();
    const dateWithProperDay = this.setDay(dateWithProperTime);

    return this.getFullEventData(dateWithProperDay);
  }

  private setTime () {
    const date = this.now.set(this.eventTime);

    return date.diff(this.now).milliseconds > 0
      ? date
      : date.plus({ days: 1 });
  }

  private setDay (date: DateTime) {
    if (this.dateDescriptor.isDailyEvent) {
      return date;
    }

    if (this.dateDescriptor.monthDays) {
      return this.setDayByMonthDays(date, this.dateDescriptor.monthDays);
    }

    // remove it
    return date;
  }

  private setDayByMonthDays (date: DateTime, monthDays: number[]) {
    const monthDay = monthDays.find(day => day === date.day);


  }

  private getMonth (startedFrom: number) {
    if (startedFrom) {

    }

    // return this.dateDescriptor.months.find(month => )
  }
















  private getNextEventDate () {
    if (this.dateDescriptor.weekDays) {
      return this.getDateByWeekDays();
    }
    // @TODO there should be proper handler
    return this.getDateByWeekDays();

  }

  private getDateByWeekDays () {
    if (this.dateDescriptor.weeksInAMonth) {
      // return this.getDateByWeeksInAMonth()
    }

    const dateWithYear = this.getNextYear();
    const dateWithMonth = this.getNextMonth(dateWithYear);
    // const dateWithDay = this.getNextDay(dateWithMonth);

    return dateWithMonth;
  }

  private getNextYear () {
    const waitYears = (this.now.year - this.createdAt.year) % this.dateDescriptor.onceInAYearNumber;

    if (waitYears) {
      return this.now.set({ year: this.now.year + waitYears });
    }

    return this.now;
  }

  private getNextMonth (dateWithYear: DateTime) {
    const nextEventMonth = this.dateDescriptor.months
      .sort((a, b) => a - b)
      .find(month => month >= this.now.month);

    if (nextEventMonth) {
      return dateWithYear.set({ month: nextEventMonth + 1 });
    }

    return dateWithYear.set({
      month: this.dateDescriptor.months[0] + 1,
      year: dateWithYear.diff(this.now, "year").years === 0 ? this.increaseEventYear().year : dateWithYear.year
    });
  }

  private increaseEventYear () {
    return this.now.set({ year: this.now.year + this.dateDescriptor.onceInAYearNumber });
  }

  private increaseEventMonth (dateWithMonth: DateTime) {
    const nextEventMonth = this.dateDescriptor.months
      .sort((a, b) => a - b)
      .find(month => month > this.now.month);

    if (nextEventMonth) {
      return dateWithMonth.set({ month: nextEventMonth + 1 });
    }

    return dateWithMonth.set({
      month: this.dateDescriptor.months[0] + 1,
      year: dateWithMonth.diff(this.now, "year").years === 0 ? this.increaseEventYear().year : dateWithMonth.year
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




















  // public getEvent () {
  //   if (this.dateDescriptor.isDailyEvent) {
  //     // calculate next event date
  //   }

  //   const nextEventDate = this.getNextEventDate();

  //   return this.getFullEventData(nextEventDate);
  // }

  // private getNextEventDate () {
  //   if (this.dateDescriptor.weekDays) {
  //     return this.getDateByWeekDays();
  //   }
  //   // @TODO there should be proper handler
  //   return this.getDateByWeekDays();

  // }

  // private getDateByWeekDays () {
  //   if (this.dateDescriptor.weeksInAMonth) {
  //     // return this.getDateByWeeksInAMonth()
  //   }

  //   const dateWithYear = this.getNextYear();
  //   const dateWithMonth = this.getNextMonth(dateWithYear);
  //   const dateWithDay = this.getNextDay(dateWithMonth);

  //   return dateWithMonth;
  // }

  // private getNextYear () {
  //   const waitYears = (this.now.year - this.createdAt.year) % this.dateDescriptor.onceInAYearNumber;

  //   if (waitYears) {
  //     return this.now.set({ year: this.now.year + waitYears });
  //   }

  //   return this.now;
  // }

  // private getNextMonth (dateWithYear: DateTime) {
  //   const nextEventMonth = this.dateDescriptor.months
  //     .sort((a, b) => a - b)
  //     .find(month => month >= this.now.month);

  //   if (nextEventMonth) {
  //     return dateWithYear.set({ month: nextEventMonth + 1 });
  //   }

  //   return dateWithYear.set({
  //     month: this.dateDescriptor.months[0] + 1,
  //     year: dateWithYear.diff(this.now, "year").years === 0 ? this.increaseEventYear().year : dateWithYear.year
  //   });
  // }

  // private getNextDayByDaysOfWeek (dateWithMonth: DateTime) {

  // }

  // private increaseEventYear () {
  //   return this.now.set({ year: this.now.year + this.dateDescriptor.onceInAYearNumber });
  // }

  // private increaseEventMonth (dateWithMonth: DateTime) {
  //   const nextEventMonth = this.dateDescriptor.months
  //     .sort((a, b) => a - b)
  //     .find(month => month > this.now.month);

  //   if (nextEventMonth) {
  //     return dateWithMonth.set({ month: nextEventMonth + 1 });
  //   }

  //   return dateWithMonth.set({
  //     month: this.dateDescriptor.months[0] + 1,
  //     year: dateWithMonth.diff(this.now, "year").years === 0 ? this.increaseEventYear().year : dateWithMonth.year
  //   });
  // }

  // private getFullEventData (nextEventDate: DateTime) {
  //   return {
  //     ...this.commonEventData,
  //     nextEventDate: nextEventDate.toLocal().toRFC2822()
  //   };
  // }

  // private formatDate (date: DateTime | string) {
  //   if (typeof date === "string") {
  //     return DateTime.fromISO(date).toLocal().toRFC2822();
  //   }

  //   return date.toLocal().toRFC2822();
  // }

  // private getTime (date: DateTime) {
  //   return {
  //     hour: date.hour,
  //     minute: date.minute,
  //     second: date.second
  //   };
  // }
}

















// import { DateTime } from "luxon";
// import { IEventSchema } from "sdk";

// interface IDateDescriptor extends Pick<IEventSchema,
// // "createdAt" |
// // "eventTime" |
// "isDailyEvent" |
// "monthDays" |
// "months" |
// "onceInAYearNumber" |
// "weekDays" |
// "weeksInAMonth"
// > {}

// export class Event {
//   // private nextDay: number | string;
//   private DateDescriptor: IDateDescriptor
//   private commonEventData: {
//     id: any;
//     createdAt: IEventSchema["createdAt"];
//     title: IEventSchema["description"];
//   }
//   private createdAt: DateTime;
//   private eventTime: DateTime;

//   // private isWeekDay: boolean;

//   constructor ({ createdAt, description, _id, createdAt, eventTime, ...dateData }: IEventSchema) {
//     this.dateDescriptor = dateData;
//     this.commonEventData = {
//       id: _id,
//       createdAt: this.formatDate(createdAt),
//       title: description
//     };
//     this.createdAt = DateTime.fromISO(createdAt);
//     this.eventTime = DateTime.fromISO(eventTime);
//   }

//   public getEvent () {
//     if (this.dateDescriptor.isDailyEvent) {
//       return this.getFullEventData(this.handleDailyEvent());
//     }

//     let nextDate = DateTime.utc().set({
//       hour: this.eventTime.hour,
//       minute: this.eventTime.minute,
//       second: this.eventTime.second
//     });

//     nextDate = this.setNextEventYear(this.dateDescriptor, nextDate);
//     // nextDate = this.setNextEventMonths(this.dateDescriptor, nextDate);

//     return this.getFullEventData(nextDate);
//   }

//   public getCurrentDateInfo () {
//     return DateTime.local();
//   }

//   private getFullEventData (nextEventDate: DateTime) {
//     return {
//       ...this.commonEventData,
//       nextEventDate: nextEventDate.toLocal().toRFC2822()
//     };
//   }

// private handleDailyEvent () {
//   const diff = this.now.diff(this.createdAt.set(this.eventTime), [ "hours" ]);
//   // @TODO simplify this
//   return diff.hours < 0
//     ? this.now.set(this.eventTime)
//     : this.now.set({
//       ...this.eventTime,
//       day: this.now.plus({
//         day: this.createdAt.diffNow("millisecond").milliseconds > 0
//           ? this.createdAt.day
//           : 1
//       }).day });
// }

//     return diff.hours < 0
//       ? this.now.set(time)
//       : this.now.set({
//         ...time,
//         day: this.now.plus({
//           day: this.createdAt.diffNow("millisecond").milliseconds > 0
//             ? this.createdAt.day
//             : 1
//         }).day });
//   }

//   // private handleWeekDaysEvent (event: IDateDescriptor) {
//   //   if (event.weeksInAMonth.length) {

//   //   }
//   // }

//   private formatDate (date: DateTime | string) {
//     if (typeof date === "string") {
//       return DateTime.fromISO(date).toLocal().toRFC2822();
//     }

//     return date.toLocal().toRFC2822();
//   }

//   private get now () {
//     return DateTime.local().toUTC();
//   }

//   // private getDayOfDayWeek (weekDay: number, number: number) {
//   //   const month
//   // }
//   private setNextEventYear (event: IDateDescriptor, nextDate: DateTime) {
//     const startYear = this.createdAt.get("year");
//     const currentYear = this.now.get("year");

//     if (startYear > currentYear) {
//       return nextDate.set({ year: startYear });
//     }

//     const waitYears = event.onceInAYearNumber - ((currentYear - startYear) % event.onceInAYearNumber);
//     // console.log("-------- waitYears ----------- ", waitYears);
//     // console.log("-------- startYear ----------- ", startYear);
//     // console.log("-------- currentYear ----------- ", currentYear);
//     // console.log("-------- startYear > currentYear ----------- ", startYear > currentYear);
//     if (waitYears) {
//       return nextDate.plus({ years: waitYears });
//     }

//     return nextDate;
//   }

//   private setNextEventMonths (event: IDateDescriptor, nextDate: DateTime) {
//     const currentMonth = this.now.get("month");
//     const nextEventMonth = event.months
//       .sort((a, b) => a - b)
//       .find(month => month >= currentMonth);
//     // console.log("----- next event month -------- ", nextEventMonth);
//     // console.log("----- event -------- ", event);
//     if (nextEventMonth) {
//       return nextDate.set({ month: nextEventMonth + 1 });
//     }

//     return nextDate.set({
//       year: nextDate.plus({ years: event.onceInAYearNumber }).get("year"),
//       month: event.months[0]
//     });
//   }

//   // private getMax (arr: number[]) {
//   //   return Math.max.apply(null, arr);
//   // }

//   // private sortNumber (a, b)
// }

// // export const eventService = new Event();