import { useEffect, useRef, useState } from "react";
import "./MultiSelect.scss";
import ArrowDownIcon from "./../assets/icons/arrow-down.svg";
import CloseIcon from "./../assets/icons/close.svg";

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
  const inputRef = useRef<HTMLInputElement>(null);

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
      <div className="multi-select" ref={containerRef}>
        <div
          className="input-wrapper"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder="Type and press Enter"
          />
          <span className={`arrow ${isOpen ? "open" : ""}`}>
            <img src={ArrowDownIcon} alt="arrow down icon" />
          </span>
        </div>

        {isOpen && (
          <div className="dropdown">
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected = selectedOptions.some(
                  (s) => s.value === option.value
                );
                return (
                  <span
                    key={option.value}
                    className={`option ${isSelected ? "disabled" : ""}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </span>
                );
              })
            ) : (
              <span className="placeholder">
                Type and press enter to add new option!
              </span>
            )}
          </div>
        )}
      </div>
      {selectedOptions.length > 0 && (
        <div className="badges">
          {selectedOptions.map((opt) => (
            <span key={opt.value} className="badge">
              <span className="label"> {opt.label}</span>
              <button
                onClick={() => handleRemove(opt.value)}
                className="close-btn"
              >
                <img src={CloseIcon} alt="close icon" />
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default MultiSelect;
