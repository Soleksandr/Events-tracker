import React from "react";
import { IUser } from "sdk/models";
import { Description } from "./components/Description";

export interface IHomeProps {
  user: IUser;
}

export const Home = () => {
  return (
    <div>
      <Description />
    </div>
  );
};