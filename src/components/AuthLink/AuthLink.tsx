import { FC } from "react";
import Link from "next/link";

import { AuthLinkProps } from "./AuthLink.type";
import styles from "./AuthLink.module.scss";

const AuthLink: FC<AuthLinkProps> = ({ textMsg, linkMsg, link, className }) => (
  <div className={`${styles["auth-link"]} ${className}`}>
    <div>
      <span className={styles["auth-link__text"]}>{textMsg}</span>
      &nbsp;
      <Link
        className={styles["auth-link__link"]}
        href={link}
        aria-label="Auth nav link"
      >
        {linkMsg}
      </Link>
    </div>
  </div>
);

export default AuthLink;
