import { OptionT } from "../../MultiSelect.types";

export type DropDownPropsT = {
  options: OptionT[];
  selectedOptions: OptionT[];
  handleOptionClick: (option: OptionT) => void;
  noOptionsText?: string;
};
