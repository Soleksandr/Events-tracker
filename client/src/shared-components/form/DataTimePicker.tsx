import React from "react";
import { FieldProps } from "formik";
import { DateTimePicker, DatePicker, TimePicker } from "@material-ui/pickers";

declare type PickerType = "date" | "time" | "datetime"


interface IPickerProps extends FieldProps {
  value?: Date;
  label: string;
  disableFuture: boolean;
  disablePast: boolean;
  pickerType: PickerType;
}

export const Picker: React.SFC<IPickerProps> =({ field, form, pickerType, label, ...other }) => {
  const currentError = form.errors[field.name];
  let Component = DateTimePicker;

  if (pickerType === "date") {
    Component = DatePicker;
  }

  if (pickerType === "time") {
    Component = TimePicker;
  }

  return (
    <Component
      clearable
      label={label.toUpperCase()}
      name={field.name}
      value={field.value}
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date.toString(), true)}
      {...other}
    />
  );
};
