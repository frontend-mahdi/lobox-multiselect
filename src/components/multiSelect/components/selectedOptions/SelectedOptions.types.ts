import { OptionT } from "../../../../types";

export type SelectedOptionsPropsT = {
    selectedOptions: OptionT[];
    handleRemove: (value: OptionT["value"]) => void;
}