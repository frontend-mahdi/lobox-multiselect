import { FC } from "react";
import CheckIcon from "../../icons/CheckIcon";
import { DropDownPropsT } from "./DropDown.types";
import styles from "./DropDown.module.scss";

const DropDown: FC<DropDownPropsT> = ({
  options,
  selectedOptions,
  handleOptionClick,
}) => {
  return (
    <div className={styles.dropdown}>
      {options.length > 0 ? (
        options.map((option) => {
          const isSelected = selectedOptions.some(
            (s) => s.value === option.value
          );
          return (
            <span
              key={option.value}
              className={`${styles.option} ${isSelected ? styles.option_selected : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              <span>{option.label}</span>
              {isSelected && <CheckIcon />}
            </span>
          );
        })
      ) : (
        <span className={styles.placeholder}>
          Type and press enter to add new option!
        </span>
      )}
    </div>
  );
};

export default DropDown;
