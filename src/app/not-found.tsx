import Link from "next/link";
import { PublicHeader } from "./(chapter)/@publicRoute/components";
import styles from "./app.module.scss";

export default function NotFound() {
  return (
    <>
      <PublicHeader isShow />
      <main>
        <section className={styles["error"]}>
          <div className={`${styles["container"]} ${styles["not-found"]}`}>
            <h1 className={`${styles["error_title"]} ${styles["title"]}`}>
              Oh no! Page not found
            </h1>
            <p className={`${styles["error__text"]} ${styles["text"]}`}>
              Sorry, we couldn`t find the page you are looking for.
            </p>
            <div className={styles["error__button"]}>
              <Link className="button" href="/">
                Go to home page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
