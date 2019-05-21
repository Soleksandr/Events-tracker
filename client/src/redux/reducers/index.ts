import user from "./users";
import { IUser } from "sdk/models";
import { combineReducers } from "redux";

export interface IState {
  user: IUser;
}

export default combineReducers({
  user
});
