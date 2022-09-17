import searchIcon from "~/assets/searchIcon.svg";

import styles from "./header.module.scss";

export function Header() {
  return (
    <header>
      <div className={styles.content}>
        <img
          className={styles.pokeLogo}
          alt="pokemon logo"
          src="https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
        />
        <div className={styles.searchField}>
          <input type="text" placeholder="Pesquisar" />
          <img className={styles.searchImg} alt="search" src={searchIcon} />
        </div>
      </div>
    </header>
  );
}
