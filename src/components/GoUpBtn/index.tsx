import goUpIcon from "~/assets/goUpIcon.svg";

import styles from "./goupbtn.module.scss";

interface GoUpBtnProps {
  show: boolean;
}

export function GoUpBtn({ show }: GoUpBtnProps) {
  function handleGoUp() {
    window.scrollTo(0, 0);
  }

  return (
    <button
      style={{ bottom: show ? "15%" : "-20%" }}
      className={styles.goUpBtn}
      type="button"
      onClick={handleGoUp}
    >
      <img className={styles.goUpIcon} alt="go up" src={goUpIcon} />
    </button>
  );
}
