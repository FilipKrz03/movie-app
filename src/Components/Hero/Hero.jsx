import React, { useEffect, useState } from "react";
import classes from "./Hero.module.scss";
import { Rating } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Hero = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [oldImg, setOldImg] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [votes, setVotes] = useState("");
  const [movieNumber, setMovieNumber] = useState(0);

  useEffect(() => {
    const newMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=bd1cb6e5c7a90f4635d43e6a6ea51ffe&language=pl-Pl"
      );
      const data = await response.json();
      const dataMovie = data.results[movieNumber];
      const imgPath = dataMovie.backdrop_path;

      setImgSrc(`https://image.tmdb.org/t/p/original/${imgPath}`);
      setTitle(dataMovie.title || dataMovie.name);
      setOverview(dataMovie.overview);
      setVotes(dataMovie.vote_average);

      setTimeout(() => {
        setOldImg(`https://image.tmdb.org/t/p/original/${imgPath}`);
      }, 510);
    };
    newMovies();
  }, [movieNumber]);

  const movieIncrement = () => {
    if (movieNumber === 10) {
      setMovieNumber(0);
    } else {
      setMovieNumber((prevState) => prevState + 1);
    }
  };

  const movieDecrement = () => {
    if (movieNumber === 0) {
      setMovieNumber(10);
    } else {
      setMovieNumber((prevState) => prevState - 1);
    }
  };

   useEffect(() => {
    const interval = setInterval(() => {
      if (movieNumber === 10) {
        setMovieNumber(0);
      } else {
        setMovieNumber((prevState) => prevState + 1);
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [movieNumber]); 

  return (
    <React.Fragment>
      <div
      id="home"
        className={`${classes.hero} ${classes.animation}`}
        key={movieNumber}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.829) 15%, rgba(0, 0, 0, 0) 120%),
          url(${imgSrc})`,
        }}
      >
        <div className={classes.description}>
          <h1>{title}</h1>
          <p>{overview}</p>
          <div className={classes.ratings}>
            <p>Ocena : </p>
            <Rating
              value={votes / 2}
              precision={0.5}
              className={classes.stars}
              readOnly
            />
            <span>{(votes / 2).toFixed(2)}</span>
          </div>
        </div>
        <ArrowBack
          className={classes.back}
          fontSize="large"
          onClick={movieDecrement}
        />
        <ArrowForward
          className={classes.forward}
          fontSize="large"
          onClick={movieIncrement}
        />
      </div>

      <div
        className={classes["old-background"]}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.829) 15%, rgba(0, 0, 0, 0) 120%),
          url(${oldImg})`,
        }}
      />
    </React.Fragment>
  );
};

export default Hero;
