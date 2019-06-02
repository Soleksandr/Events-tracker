import * as types from "../action-types/users";
import persister from "../../services/Persister";
import { userApi } from "../../api/User";
import { put, takeEvery } from "redux-saga/effects";
import { ICreateUser, ILoginUser } from "sdk/models";

function* createUser(action: {type: string; payload: ICreateUser }) {
  const payload = yield userApi.create(action.payload);
  persister.persistData("user", payload);
  yield put({ type: types.USER_CREATED, payload });
}

export function* watchCreateUser() {
  yield takeEvery(types.CREATE_USER, createUser);
}

function* loginUser(action: {type: string; payload: ILoginUser }) {
  const payload = yield userApi.login(action.payload);
  persister.persistData("user", payload);

  yield put({ type: types.USER_LOGGED_IN, payload });
}

export function* watchLoginUser() {
  yield takeEvery(types.LOGIN_USER, loginUser);
}

function* logOutUser() {
  const payload = yield userApi.logout();
  persister.removeData("user");

  yield put({ type: types.USER_LOGGED_OUT, payload });
}

export function* watchLogoutUser() {
  yield takeEvery(types.USER_LOGOUT, logOutUser);
}