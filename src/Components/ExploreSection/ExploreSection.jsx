import React, { useState , useEffect } from "react";
import ExploreMenu from "./ExploreMenu";
import MovieItem from "../UI/MovieItem";
import useHttp from '../../hooks/useHttp';
import classes from './ExploreSection.module.scss';

const ExploreSection = () => {

  const [movies , setMovies] = useState([]);
  const [id , setId] = useState(28);
  const {sendRequest : getMovies ,  isError} = useHttp()


  const searchHandler = (id) => {
    setId(id);
  }     

  useEffect(()=>{
    getMovies(
      `https://api.themoviedb.org/3/discover/movie?api_key=bd1cb6e5c7a90f4635d43e6a6ea51ffe&with_genres=${id}&language=pl-Pl` ,
      (data) => {setMovies(data.results)}
    );
  } , [id , getMovies])


  const movieItems = movies.map(movie => {
    return(
        <MovieItem
         id = {movie.id}
         key = {movie.id}
         poster = {movie.poster_path}
         title = {movie.title}
         vote = {movie.vote_average}
         />
    )
  })

  if(isError){
    return (
      <p>Something went wrong</p>
    )
  }

  return (
    <React.Fragment>
      <ExploreMenu onNewCategory={searchHandler} />
      <div className={classes.movies} key={id}>
      {movieItems}
      </div>
    </React.Fragment>
  );
};

export default React.memo(ExploreSection);
