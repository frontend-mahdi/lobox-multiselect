import { OptionT } from "../../types";

export type DropDownPropsT = {
  options: OptionT[];
  selectedOptions: OptionT[];
  handleOptionClick: (option: OptionT) => void;
};
