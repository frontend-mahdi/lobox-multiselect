import { useRef } from "react";
import styles from "./MultiSelect.module.scss";
import Input from "./components/input";
import DropDown from "./components/dropDown";
import SelectedOptions from "./components/selectedOptions";
import useMultiSelect from "./hooks/useMultiSelect";
import useClickOutside from "./hooks/useClickOutside";

const MultiSelect = () => {
  const {
    searchValue,
    setSearchValue,
    options,
    selectedOptions,
    handleKeyDown,
    handleOptionClick,
    isOpen,
    setIsOpen,
    handleRemove,
  } = useMultiSelect();

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <>
      <div className={styles.multi_select} ref={containerRef}>
        <Input
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleKeyDown={handleKeyDown}
        />

        {isOpen && (
          <DropDown
            options={options}
            selectedOptions={selectedOptions}
            handleOptionClick={handleOptionClick}
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
