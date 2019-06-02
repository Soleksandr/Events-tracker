import { all } from "redux-saga/effects";
import { watchCreateEvent, watchReceiveEvents } from "./events";
import { watchCreateUser, watchLoginUser, watchLogoutUser } from "./users";

export default function* rootSaga() {
  yield all([
    watchCreateUser(),
    watchLoginUser(),
    watchCreateEvent(),
    watchReceiveEvents(),
    watchLogoutUser()
  ]);
}
