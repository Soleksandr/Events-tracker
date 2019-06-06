import React from "react";
import { WeeksInAMonth } from "sdk";
import { FieldProps } from "formik";
import { enumToOptionsArr } from "../../../../utils/helpers";
import { MultiDropDown } from "shared-components/form/MultiDropDown";

export const WeeksInAMonthField: React.FC<FieldProps> = (props) => {
  return (
    <MultiDropDown
      fullWidth
      margin="normal"
      id="weekInAMonth"
      options={enumToOptionsArr(WeeksInAMonth)}
      label="Week numbers in a month"
      {...props}
    />
  );
};