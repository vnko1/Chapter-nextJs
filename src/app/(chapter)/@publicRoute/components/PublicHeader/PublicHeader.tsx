"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import { LinksEnum } from "@/types";
import { Logo } from "@/components";

import styles from "./PublicHeader.module.scss";

type Props = { isShow?: boolean };

const PublicHeader: FC<Props> = ({ isShow = false }) => {
  const pathname = usePathname();
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        {pathname !== LinksEnum.HOME || isShow ? <Logo alt="chapter" /> : null}
      </div>
    </header>
  );
};

export default PublicHeader;
