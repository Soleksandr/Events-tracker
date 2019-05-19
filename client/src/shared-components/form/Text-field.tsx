import mapProps from "recompose/mapProps";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { FieldProps } from "formik";

export interface ITextFieldProps extends FieldProps {
  label: string;
}

export default mapProps<TextFieldProps, ITextFieldProps>(
  ({ field: { value = "", ...field }, form: { touched, errors, submitCount }, label, ...other }) => {
    const showError = touched[field.name] || submitCount > 0;

    return {
      value,
      label: label.toUpperCase(),
      margin: "normal",
      InputLabelProps: { shrink: true },
      error: Boolean(showError && errors[field.name]),
      helperText: showError ? errors[field.name] : undefined,
      ...field,
      ...other
    };
  }
)(TextField);
