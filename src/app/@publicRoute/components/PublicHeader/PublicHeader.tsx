"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import { LinksEnum } from "@/types";
import { Logo } from "@/components";

import styles from "./PublicHeader.module.scss";

const PublicHeader: FC = () => {
  const pathname = usePathname();
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        {pathname !== LinksEnum.HOME ? <Logo alt="chapter" /> : null}
      </div>
    </header>
  );
};

export default PublicHeader;
