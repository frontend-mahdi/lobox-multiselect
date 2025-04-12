import React, { useState } from "react";
import { OptionT } from "../MultiSelect.types";

const useMultiSelect = ({ defaultOptions }: { defaultOptions?: OptionT[] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<OptionT[]>(defaultOptions || []);
  const [selectedOptions, setSelectedOptions] = useState<OptionT[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      const trimmed = searchValue.trim();
      const exists = options.some((opt) => opt.label === trimmed);

      if (!exists) {
        const newOption = {
          label: trimmed,
          value: trimmed.toLowerCase().replace(/\s+/g, "-"),
        };
        setOptions((prev) => [...prev, newOption]);
        // setSelectedOptions((prev) => [...prev, newOption]); // auto-select new option
      } else {
        const matched = options.find((opt) => opt.label === trimmed);
        if (
          matched &&
          !selectedOptions.find((s) => s.value === matched.value)
        ) {
          setSelectedOptions((prev) => [...prev, matched]);
        }
      }

      setSearchValue("");
    }
  };
  const handleOptionClick = (option: OptionT) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      setSelectedOptions((prev) => [...prev, option]);
    } else handleRemove(option.value);
  };
  const handleRemove = (value: string | number) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.value !== value));
  };

  return {
    searchValue,
    setSearchValue,
    options,
    setOptions,
    selectedOptions,
    setSelectedOptions,
    isOpen,
    setIsOpen,
    handleKeyDown,
    handleOptionClick,
    handleRemove,
  };
};

export default useMultiSelect;
