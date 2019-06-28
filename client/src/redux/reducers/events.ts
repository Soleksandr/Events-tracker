import * as types from "../action-types/events";
import { IEventSchema } from "sdk/models";
import { handleActions } from "redux-actions";

export default handleActions<IEventSchema[], any>(
  {
    [types.EVENT_CREATED]: (state, { payload }) => {
      return [ ...state, payload ];
    },
    [types.EVENTS_RECEIVED]: (_, { payload }) => {
      return payload;
    }
  },
  []
);
