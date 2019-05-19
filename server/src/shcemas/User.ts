import { Document, Schema, model } from "mongoose";
import { IUser } from "sdk/models";

export interface IUserModel extends IUser, Document {}

export const UserSchema: Schema<IUserModel> = new Schema<IUserModel>({
  name: String,
  email: String,
  createdAt: Date,
  password: String
});
UserSchema.pre<IUserModel>("save", function(next) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

export const User = model<IUserModel>("User", UserSchema);
