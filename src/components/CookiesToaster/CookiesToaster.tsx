"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { IconEnum } from "@/types";
import { Icon } from "@/components";
import styles from "./CookiesToaster.module.scss";

const CookiesToaster: FC = () => {
  const [toasterHide, setToasterHide] = useState(true);

  useEffect(() => {
    setToasterHide(JSON.parse(localStorage.getItem("cookieAccept") || "false"));
  }, []);

  const cookieAccept = () => {
    window.localStorage.setItem("cookieAccept", JSON.stringify(true));

    setToasterHide(true);
  };

  if (toasterHide) return null;
  return (
    <div className={styles["cookie-toaster__wrapper"]}>
      <div className={styles["info-block"]}>
        <h5 className={styles["info-block__title"]}>
          This website uses cookies
        </h5>
        <p className={styles["info-block__text"]}>
          We use cookies to make sure this website can function. By continuing
          to browse on this website, you agree to our use of cookies.
        </p>

        <button
          onClick={cookieAccept}
          className={styles["info-block__accept"]}
          aria-label="Continue to website button"
        >
          <p>Continue to website</p>
          <Icon width={20} height={20} icon={IconEnum.ArrowRight} />
        </button>
      </div>
      <div className={styles["image-block"]}>
        <Image
          src={"/images/CookiesGirl.webp"}
          alt="cookie popup image"
          width={560}
          height={214}
        />
      </div>
    </div>
  );
};

export default CookiesToaster;
