export interface IUser {
  name?: string;
  email: string;
}

export interface ICreateUser extends IUser {
  confirmPassword: string;
  password: string;
}

export type ILoginUser = Pick<IUser, "email"> & { password: string }
