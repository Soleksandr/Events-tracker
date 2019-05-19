import { all } from "redux-saga/effects";
import watchTestSaga from "./test";

export default function* rootSaga() {
  yield all([watchTestSaga()]);
}
