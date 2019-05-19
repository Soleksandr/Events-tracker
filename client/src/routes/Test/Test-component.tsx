import React from "react";
import Button from "@material-ui/core/Button";

export interface ITestProps {
  text: string;
  testSaga: () => { type: string };
}

export const Test: React.SFC<ITestProps> = props => (
  <div>
    {console.log(props)}
    {props.text}
    <Button onClick={props.testSaga}>test saga</Button>
  </div>
);
