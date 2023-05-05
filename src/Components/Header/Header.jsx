import React, { useState } from "react";
import SearchMovies from "./SearchMovies";
import classes from "./Header.module.scss";
import logo from "../../img/movie-icon.png";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Header = (props) => {
  
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navChanger = () => {
    setMobileNavActive((prevValue) => !prevValue);
  };

  const searchHandler = () => {
    setIsSearchActive((prevValue) => !prevValue);
  };

  const closeHandler = () => {
    setIsSearchActive(prevValue => !prevValue);
    props.onClose();
  }

  const findMoviesHandler = async(movies) => {
    props.onSearch(movies);
  };

  return (
    <header className={classes.header}>
      <img src={logo} className={classes["logo-img"]} alt="Logo of our app" />
      {isSearchActive && <SearchMovies onSearch={findMoviesHandler} />}
      <ul
        className={`${classes["nav-list"]} ${
          mobileNavActive ? classes.active : ""
        }`}
      >
        <li onClick={navChanger}>
          {!isSearchActive && (
            <SearchIcon fontSize="large" onClick={searchHandler} className={classes['action-icon']} />
          )}
          {isSearchActive && (
            <CloseIcon fontSize="large" onClick={closeHandler} className={classes['action-icon']} />
          )}
        </li>
        <li onClick={navChanger}> <a href="#home"> Dom </a> </li>
        <li onClick={navChanger}> <a href="#explore"> Odkrywaj </a></li>
      </ul>
      <button
        className={`${classes.burger} ${mobileNavActive ? classes.active : ""}`}
        onClick={navChanger}
      >
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </button>
    </header>
  );
};

export default Header;
