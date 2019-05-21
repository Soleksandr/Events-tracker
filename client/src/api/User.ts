import { query } from "../services/Query";
import { ILoginUser, ICreateUser } from "sdk/models";

class UserApi {
  public create = (user: ICreateUser) => {
    return query.post("/api/users/create", user);
  }
  public login = (user: ILoginUser) => {
    return query.post("/api/users/login", user);
  }
}

export const userApi = new UserApi();