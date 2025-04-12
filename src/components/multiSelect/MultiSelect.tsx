import { FC, useEffect, useRef } from "react";
import styles from "./MultiSelect.module.scss";
import Input from "./components/input";
import DropDown from "./components/dropDown";
import SelectedOptions from "./components/selectedOptions";
import useMultiSelect from "./hooks/useMultiSelect";
import useClickOutside from "./hooks/useClickOutside";
import { MultiSelectPropsT } from "./MultiSelect.types";

const MultiSelect: FC<MultiSelectPropsT> = ({
  options: defaultOptions = [],
  value,
  onChange,
  placeholder,
  noOptionsText,
}) => {
  const {
    searchValue,
    setSearchValue,
    options,
    selectedOptions,
    setSelectedOptions,
    handleKeyDown,
    handleOptionClick,
    isOpen,
    setIsOpen,
    handleRemove,
  } = useMultiSelect({
    defaultOptions,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(selectedOptions)) {
      setSelectedOptions(value);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <div className={styles.multi_select} ref={containerRef}>
        <Input
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleKeyDown={handleKeyDown}
          placeholder={placeholder}
        />

        {isOpen && (
          <DropDown
            options={options}
            selectedOptions={selectedOptions}
            handleOptionClick={handleOptionClick}
            noOptionsText={noOptionsText}
          />
        )}
      </div>
      <SelectedOptions
        selectedOptions={selectedOptions}
        handleRemove={handleRemove}
      />
    </>
  );
};

export default MultiSelect;
