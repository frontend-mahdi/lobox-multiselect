import { useEffect, useRef, useState } from "react";
import styles from "./MultiSelect.module.scss";
import Input from "./components/input";
import DropDown from "./components/dropDown";
import SelectedOptions from "./components/selectedOptions";

const MultiSelect = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [options, setOptions] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleOptionClick = (option: {
    label: string;
    value: string | number;
  }) => {
    if (!selectedOptions.find((o) => o.value === option.value)) {
      setSelectedOptions((prev) => [...prev, option]);
    } else handleRemove(option.value);
  };

  const handleRemove = (value: string | number) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.value !== value));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
