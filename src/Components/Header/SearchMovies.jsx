import React from "react";
import classes from "./SearchMovies.module.scss";

const SearchMovies = props => {

  const searchMovieHandler = event => {
    props.onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Szukaj filmów"
      className={classes.input}
      onChange={searchMovieHandler}
    />
  );
};

export default SearchMovies;
