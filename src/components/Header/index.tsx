import { useContext } from "react";

import searchIcon from "~/assets/searchIcon.svg";
import { SearchContext } from "~/contexts/SearchContext";

import styles from "./header.module.scss";

interface HeaderProps {
  isHeaderFix: boolean;
}

export function Header({ isHeaderFix }: HeaderProps) {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <header
      style={{
        position: isHeaderFix ? "fixed" : "sticky",
        top: isHeaderFix ? "0" : "-20%",
      }}
    >
      <div className={styles.content}>
        <img
          className={styles.pokeLogo}
          alt="pokemon logo"
          src="https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
        />
        <div className={styles.searchField}>
          <input
            type="text"
            placeholder="Search by name or type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img className={styles.searchImg} alt="search" src={searchIcon} />
        </div>
      </div>
    </header>
  );
}
