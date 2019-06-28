import { IEvent } from "sdk/models";
import { query } from "../services/Query";

class EventApi {
  public create = (event: IEvent) => {
    console.log("====== event ======= ", event);
    return query.post("/api/events/create", event);
  }

  public getAll = () => {
    return query.get("/api/events");
  }
}

export const eventApi = new EventApi();