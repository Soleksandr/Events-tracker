import { handleActions } from "redux-actions";
import * as types from "../action-types/test";

export interface ITestState {
  text: string;
  other: string;
}

const initialState: ITestState = { text: "test data", other: "other data" };

export default handleActions(
  {
    [types.TEST_SAGA_DONE]: (state, data) => {
      console.log("data = ", data);
      return { ...state, text: data.payload.text };
    }
  },
  initialState
);
