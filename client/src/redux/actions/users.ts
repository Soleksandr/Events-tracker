import * as types from "../action-types/users";
import { ICreateUser, ILoginUser } from "sdk/models";

export const createUser = (data: ICreateUser) => ({
  type: types.CREATE_USER,
  payload: data
});

export const loginUser = (data: ILoginUser) => ({
  type: types.LOGIN_USER,
  payload: data
});

export const logOutUser = () => {
  return {
    type: types.USER_LOGOUT
  };
};
