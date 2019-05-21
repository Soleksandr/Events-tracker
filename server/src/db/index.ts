import mongoose from "mongoose";
import { asyncCall } from "../lib/async";
import { usersSchema, IUserModel } from "./schemas/Users";;

class Database {
  public users: mongoose.Model<IUserModel>;
  public db: mongoose.Connection;

  async connect () {
    const { DB_HOST, NODE_ENV } = process.env;
    const { error } = await asyncCall(mongoose.connect(DB_HOST as string, { useNewUrlParser: true }));

    if (error) {
      throw new Error(error);
    }

    console.log(`--- Successfully connected to ${NODE_ENV} database --- `);

    this.db = mongoose.connection;
    this._createModels();

    return this;
  }

  public close () {
    mongoose.connection.close();
  }

  private _createModels () {
    this.users = mongoose.model("Users", usersSchema);
  }
}

export const db = new Database();
