import { OptionT } from "../../MultiSelect.types";

export type SelectedOptionsPropsT = {
    selectedOptions: OptionT[];
    handleRemove: (value: OptionT["value"]) => void;
}