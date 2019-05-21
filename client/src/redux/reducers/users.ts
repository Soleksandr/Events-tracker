import * as types from "../action-types/users";
import { IUser } from "sdk/models";
import { handleActions } from "redux-actions";

export default handleActions<IUser | null>(
  {
    [types.USER_CREATED]: (_, { payload }) => {
      return payload;
    },
    [types.USER_LOGGED_IN]: (_, { payload }) => {
      return payload;
    },
    [types.USER_LOGGED_OUT]: () => null
  },
  null
);
