import { IMenuItem } from "../shared-components/form/MultiDropDown";

export const enumToOptionsArr = (enumItem: any) => {
  return Object.values(enumItem).reduce((options: Array<IMenuItem>, item) => {
    if (typeof item === "number") {
      options.push({ value: item, displayName: enumItem[item] });
    }

    return options;
  }, []);
};