import React from "react";
import { IUser } from "sdk/models";
import { Table } from "./components/Table/Table";
import { Description } from "./components/Description/Description";;

export interface IHomeProps {
  user: IUser;
}

export const Home = ({ user }: IHomeProps) => {
  return (
    user
      ? <Table />
      : <Description />
  );
};