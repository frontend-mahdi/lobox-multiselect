export interface OptionT {
  label: string;
  value: string | number;
}

export interface MultiSelectPropsT {
  options?: OptionT[];
  value?: OptionT[];
  onChange?: (selected: OptionT[]) => void;
  placeholder?: string;
  noOptionsText?: string;
}
