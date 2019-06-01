import React from "react";
import { Months } from "sdk";
import { FieldProps } from "formik";
import { enumToOptionsArr } from "../../../../utils/helpers";
import { MultiDropDown } from "shared-components/form/MultiDropDown";

export const MonthsField: React.FC<FieldProps> = (props) => {
  return (
    <MultiDropDown
      fullWidth
      margin="normal"
      id="weekInAMonth"
      options={enumToOptionsArr(Months)}
      label="Months"
      {...props}
    />
  );
};