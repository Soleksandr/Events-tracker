import bcrypt from "bcrypt";
import { Document, Schema } from "mongoose";
import { IUser, ILoginUser } from "sdk/models";;

export interface IUserModel extends ILoginUser, IUser, Document {
  createdAt: Date;
}

export const usersSchema = new Schema<IUserModel>({
  createdAt: Date,
  name: { type: String, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
}, {
  timestamps: true,
  versionKey: false
});

usersSchema.pre<IUserModel>("save", function(next) {
  const now = new Date();

  if (!this.createdAt) {
    this.createdAt = now;
  }

  bcrypt.hash(this.password, 10, (err: Error, hash: string) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    next();
  });
});
