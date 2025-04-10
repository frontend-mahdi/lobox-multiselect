import { FC } from "react";
import CloseIcon from "../../../icons/CloseIcon";
import styles from "./SelectedOptions.module.scss";
import { SelectedOptionsPropsT } from "./SelectedOptions.types";

const SelectedOptions: FC<SelectedOptionsPropsT> = ({ selectedOptions, handleRemove }) => {
  return (
    <>
      {selectedOptions.length > 0 && (
        <div className={styles.badges}>
          {selectedOptions.map((opt) => (
            <span key={opt.value} className={styles.badge}>
              <span className={styles.label}> {opt.label}</span>
              <button
                onClick={() => handleRemove(opt.value)}
                className={styles.close_btn}
              >
                <CloseIcon />
              </button>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectedOptions;
