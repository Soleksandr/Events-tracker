import React from "react";
import { IUser } from "sdk/models";
import { Table } from "./components/Table/Table";
import { Description } from "./components/Description/Description";;

export interface IHomeProps {
  user: IUser;
  createEvent: (data: any) => any;
  getAllEvents: () => any;
  events: any;
}

export const Home = (props: IHomeProps) => {
  return (
    props.user
      ? <Table { ...props } />
      : <Description />
  );
};