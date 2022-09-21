import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { FavoriteContext } from "~/contexts/FavoriteContext";
import { SearchContext } from "~/contexts/SearchContext";

import styles from "./header.module.scss";

interface HeaderProps {
  isHeaderFix: boolean;
}

export function Header({ isHeaderFix }: HeaderProps) {
  const { search, setSearch, isTypeSearch } = useContext(SearchContext);
  const { favList } = useContext(FavoriteContext);

  const navigate = useNavigate();

  const favCount = favList.length;

  function handleSearch(input: string) {
    if (window.location.pathname === "/favorites" && input !== "") {
      navigate("/");
    }
    setSearch(input);
  }

  return (
    <header
      style={{
        position: isHeaderFix ? "fixed" : "sticky",
        top: isHeaderFix ? "0" : "-40%",
      }}
    >
      <div className={styles.content}>
        <Link to="/">
          <img
            className={styles.pokeLogo}
            alt="pokemon logo"
            src="https://logosmarcas.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
          />
        </Link>
        <div className={styles.rightSide}>
          <Link className={styles.favoritesLink} to="/favorites">
            ⭐{favCount} Favorite{favCount > 1 ? "s" : ""}
          </Link>
          <div className={styles.searchField}>
            <input
              type="text"
              placeholder="Search by name or type"
              value={search}
              disabled={isTypeSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <img
              className={styles.searchImg}
              alt="search"
              src="/src/assets/searchIcon.svg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
