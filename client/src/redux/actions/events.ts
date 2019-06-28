import * as types from "../action-types/events";
import { IEvent } from "sdk/models";

export const createEvent = (data: IEvent) => ({
  type: types.CREATE_EVENT,
  payload: data
});

export const getAllEvents = () => ({
  type: types.RECEIVE_EVENTS
});
