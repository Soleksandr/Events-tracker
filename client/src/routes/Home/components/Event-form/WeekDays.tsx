import React from "react";
import { Week } from "sdk";
import { FieldProps } from "formik";
import { enumToOptionsArr } from "../../../../utils/helpers";
import { MultiDropDown } from "shared-components/form/MultiDropDown";;

export const WeekDaysField: React.FC<FieldProps> = (props) => {

  return (
    <MultiDropDown
      fullWidth
      margin="normal"
      id="week"
      options={enumToOptionsArr(Week)}
      label="Day of week"
      {...props}
    />
  );
};