import { FC } from "react";

import { LinksEnum } from "@/types";
import { UIButton } from "@/components";
import styles from "./WelcomePagePanel.module.scss";

const WelcomePagePanel: FC = () => {
  return (
    <div className={styles["panel-container"]}>
      <div className={styles["panel"]}>
        <div className={styles["panel-description"]}>
          <h2>Welcome to Chapter</h2>
          <h3>Read, discuss, make new friends!</h3>
        </div>
        <div className={styles["panel-buttons"]}>
          <UIButton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            href={LinksEnum.SIGN_UP}
            aria-label="Sign up nav link"
          >
            Sign up
          </UIButton>
          <UIButton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            variant="outlined"
            href={LinksEnum.LOG_IN}
            aria-label="Log in nav link"
          >
            Log in
          </UIButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePagePanel;
