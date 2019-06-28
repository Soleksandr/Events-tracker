import React from "react";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import { FieldProps } from "formik";
import { withStyles, WithStyles, StyleRules } from "@material-ui/core/styles";

export interface IMenuItem {
  value: any;
  displayName: string;
}

export interface IMultiDropDownProps extends FieldProps, WithStyles {
  label: string;
  options: IMenuItem[];
  id: string;
}

const styles: StyleRules = {
  selectMenu: {
    whiteSpace: "pre-wrap"
  }
};

const Component: React.SFC<IMultiDropDownProps & FormControlProps> =(
  { field, form, label, options, classes, id, ...other }
) => {

  const handleValueChange = ({ target }: React.ChangeEvent<{ value: any; name?: string }>) => {
    form.setFieldValue(field.name, target.value);
  };

  const handleDeleteValue = (value: any) => () => {
    const values = field.value.filter((item: any) => item !== value);
    form.setFieldValue(field.name, values);
  };

  return (
    <FormControl
      {...other}
    >
      <InputLabel htmlFor={id}>{ label.toUpperCase() } </InputLabel>
      <Select
        classes={{
          selectMenu: classes.selectMenu
        }}
        multiple
        value={field.value}
        onChange={handleValueChange}
        input={<Input id={id} />}
        renderValue={(selected: any) => (
          <div>
            {
              selected.map((value: any) => {
                const selectedItem = options.find(option => option.value === value);

                return (
                  <Chip key={selectedItem!.displayName}
                    label={selectedItem!.displayName}
                    onDelete={handleDeleteValue(selectedItem!.value)}
                  />
                );
              })
            }
          </div>
        )}
      >
        {
          options.map(option => (
            <MenuItem key={option.displayName}
              value={option.value}
            >{ option.displayName }</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export const MultiDropDown = withStyles(styles)(Component);
