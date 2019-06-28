import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FieldProps } from "formik";

export interface ICheckboxProps extends FieldProps {
  label: string;
}

export const CheckboxField: React.SFC<ICheckboxProps> =(
  { field, label, ...other }
) => {

  return (
    <FormControl {...other}>
      <FormControlLabel
        control={
          <Checkbox checked={field.value}
            name={field.name}
            onChange={field.onChange}
            value={field.value}
          />
        }
        label={label.toUpperCase()}
      />
    </FormControl>
  );
};
