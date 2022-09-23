import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.container}>
      <p>Developed by Igor Pedrosa</p>
      <div className={styles.links}>
        <a
          className={styles.link}
          href="https://github.com/igorlap"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="github"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          />
          Github
        </a>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/igor-pedrosa/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="linkeidn"
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
