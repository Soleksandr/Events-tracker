import bcrypt from "bcrypt";
import { db } from "../db";
import { ICreateUser, ILoginUser } from "sdk/models";;


class Users {
  public create = async (user: ICreateUser) => {
    const { email, name, _id } = await db.users.create(user);

    return { email, name, _id };
  }

  public login = async ({ email, password }: ILoginUser) => {
    const user = await db.users.findOne({ email });

    if (!user) {
      throw new Error("Unknown user email");
    }

    return bcrypt.compare(password, user.password).then(isValid => {
      if (!isValid) {
        throw new Error("Incorrect password");
      }

      return {
        _id: user._id,
        name: user.name,
        email: user.email
      };
    });
  }
}

export const users = new Users();