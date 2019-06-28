import * as types from "../action-types/events";
import { IEvent } from "sdk/models";
import { eventApi } from "../../api/Event";
import { put, takeEvery } from "redux-saga/effects";

function* createEvent(action: {type: string; payload: IEvent }) {
  const payload = yield eventApi.create(action.payload);

  yield put({ type: types.EVENT_CREATED, payload });
}

export function* watchCreateEvent() {
  yield takeEvery(types.CREATE_EVENT, createEvent);
}


function* receiveEvents() {
  const payload = yield eventApi.getAll();

  yield put({ type: types.EVENTS_RECEIVED, payload });
}

export function* watchReceiveEvents() {
  yield takeEvery(types.RECEIVE_EVENTS, receiveEvents);
}