import styles from "./loading.module.scss";

export function Loading() {
  return (
    <div className={styles.loading}>
      <img alt="loading" src="/pikachu-gif.gif" />
    </div>
  );
}
