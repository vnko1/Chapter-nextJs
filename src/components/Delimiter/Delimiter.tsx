import { FC } from "react";

import { type DelimiterProps } from "./Delimiter.type";
import styles from "./Delimiter.module.scss";

const Delimiter: FC<DelimiterProps> = ({ text = "or", className }) => {
  return (
    <div className={styles["delimiter"]}>
      <p className={`${styles["delimiter__line"]} ${className}`}>{text}</p>
    </div>
  );
};

export default Delimiter;
