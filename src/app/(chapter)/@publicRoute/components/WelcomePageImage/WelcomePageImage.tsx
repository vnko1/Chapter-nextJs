import { FC } from "react";
import Image from "next/image";

import styles from "./WelcomePageImage.module.scss";

const WelcomePageImage: FC = () => {
  return (
    <div className={styles["image-container"]}>
      <div className={styles["image__background"]} />
      <div className={styles["image"]}>
        <Image
          src={"/images/welcome-page-girl.webp"}
          alt="chapter-girl"
          width={990}
          height={1086}
        />
      </div>
    </div>
  );
};

export default WelcomePageImage;
