import { put, takeEvery } from "redux-saga/effects";
import * as types from "../action-types/test";

export function* testSaga() {
  const payload = yield Promise.resolve({ text: "test data dispatched from middleware" });
  yield put({ type: types.TEST_SAGA_DONE, payload });
}

export default function* watchTestSaga() {
  yield takeEvery(types.TEST_SAGA, testSaga);
}
