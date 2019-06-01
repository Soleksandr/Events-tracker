import React from "react";
import { FieldProps } from "formik";
import { MultiDropDown } from "shared-components/form/MultiDropDown";

export const MonthDaysField: React.FC<FieldProps> = (props) => {
  const options = Array.from(Array(31), (_, index) => index + 1).map(el => ({ value: el, displayName: String(el) }));

  return (
    <MultiDropDown
      fullWidth
      margin="normal"
      id="weekInAMonth"
      options={options}
      label="Day of month"
      {...props}
    />
  );
};