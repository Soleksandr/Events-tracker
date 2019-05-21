import { all } from "redux-saga/effects";
import { watchCreateUser, watchLoginUser } from "./users";

export default function* rootSaga() {
  yield all([ watchCreateUser(), watchLoginUser() ]);
}
