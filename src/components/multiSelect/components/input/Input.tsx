import { FC, useRef } from "react";
import { InputPropsT } from "./Input.types";
import ArrowIcon from "../../../icons/ArrowIcon";
import styles from "./Input.module.scss";

const Input: FC<InputPropsT> = ({
  searchValue,
  setSearchValue,
  handleKeyDown,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={styles.input_wrapper}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        className={styles.input}
        placeholder="Type and press Enter"
      />
      <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
        <ArrowIcon />
      </span>
    </div>
  );
};

export default Input;
