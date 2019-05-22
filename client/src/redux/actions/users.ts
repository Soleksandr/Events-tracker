import * as types from "../action-types/users";
import persister from "../../services/Persister";
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
  persister.removeData("user");

  return {
    type: types.USER_LOGGED_OUT
  };
};
