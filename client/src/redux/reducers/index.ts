import user from "./users";
import events from "./events";
import { combineReducers } from "redux";
import { IUser, IEventSchema } from "sdk/models";

export interface IState {
  user: IUser;
  events: IEventSchema[];
}

export default combineReducers({
  user,
  events
});
