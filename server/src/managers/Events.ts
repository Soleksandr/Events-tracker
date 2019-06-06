import { db } from "../db";
import { IEvent, IUser } from "sdk";


class Events {
  public create = async (event: IEvent, user: IUser) => {
    console.log("========== user ========== ", user);
    if (user.email) {
      const newEvent = await db.events.create({ ...event, user });

      return newEvent;
    }

    throw new Error("Unauthorized");
  }

  public getByUserId = async (id: string) => {
    console.log("========== id ========== ", id);
    if (id) {
      const events = await db.events.find({ user: id });
      console.log("================= events ================== ", events);
      return events;
    }

    throw new Error("Unauthorized");
  }
}

export const events = new Events();