import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { FieldProps } from "formik";

interface IMenuItem {
  value: string;
  displayName: string;
}

export interface IDropDownProps extends FieldProps {
  label: string;
  defaultSelected: IMenuItem;
  options: IMenuItem[];
}

export const DropDown: React.SFC<IDropDownProps> =(
  { field, label, options, defaultSelected, ...other }
) => {
  // const showError = touched[field.name] || submitCount > 0;
  console.log("----------- ", field);
  console.log("------name----- ", field.name);
  return (
    <FormControl
      {...other}
    >
      <InputLabel htmlFor="age-simple">{ label.toUpperCase() } </InputLabel>
      <Select
        value={field.value}
        onChange={(data) => {console.log(data); field.onChange(data);}}
        inputProps={{
          name: field.name,
          id: "week",
        }}
      >
        <MenuItem value={defaultSelected.value}>
          {defaultSelected.displayName}
        </MenuItem>
        {
          options.map(option => (
            <MenuItem key={option.value}
              value={option.value}
            >{ option.displayName }</MenuItem>
          ))
        }
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
};









// import React from "react";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";

// interface IDropDownProps {
//   value: any;
//   onValueChange: () => void;

// }

// export const DropDown = ({ value, onValueChange }: IDropDownProps) => {
//   return (
//     <FormControl>
//       <InputLabel htmlFor="age-simple">Age</InputLabel>
//       <Select
//         value={value}
//         onChange={onValueChange}
//         inputProps={{
//           name: "age",
//           id: "age-simple",
//         }}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         <MenuItem value={10}>Ten</MenuItem>
//         <MenuItem value={20}>Twenty</MenuItem>
//         <MenuItem value={30}>Thirty</MenuItem>
//       </Select>
//     </FormControl>
//   );
// };
