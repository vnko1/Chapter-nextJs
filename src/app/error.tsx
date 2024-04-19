"use client";
import React from "react";
import Link from "next/link";
import { PublicHeader } from "./(chapter)/@publicRoute/components";
import styles from "./app.module.scss";

function Error() {
  return (
    <>
      <PublicHeader isShow />
      <section className={styles["error"]}>
        <div className={`${styles["container"]} ${styles["error"]}`}>
          <h1 className={`${styles["error_title"]} ${styles["title"]}`}>
            Oh no! Something went wrong!
          </h1>
          <div className={styles["error__button"]}>
            <Link className="button" href="/">
              Go to home page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
