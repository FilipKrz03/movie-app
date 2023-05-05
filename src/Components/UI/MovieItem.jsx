import React , { useState } from 'react';
import useHttp from '../../hooks/useHttp';
import InfoModal from "../UI/InfoModal";
import classes from "./MovieItem.module.scss";
import { Rating } from "@mui/material";

const MovieItem = (props) => {

  const {sendRequest : getMovie , isError} = useHttp();
  const [showInfoModal , setShowInfoModal] = useState(false);
  const [genre , setGenre] = useState('');
  const [moreInfo , setMoreInfo] = useState([]);

  const moreInfoHandler = async() => {
    getMovie(`
    https://api.themoviedb.org/3/movie/${props.id}?api_key=bd1cb6e5c7a90f4635d43e6a6ea51ffe&language=pl-Pl`
    , data=>{
      setMoreInfo(data)
      setGenre(data.genres[0].name);
    });
    setShowInfoModal(true);

  }

  const closeModalHandler = () => {
    setShowInfoModal(false);
  }



  if(isError){
    return (
      <p>Something went wrong</p>
    )
  }

  return (
    <React.Fragment>
    <div className={classes.item} onClick={moreInfoHandler}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.poster}`}
        alt="poster of film"
        className={classes.poster}
      />
      <p>{props.title}</p>
      <Rating
        value={props.vote / 2}
        precision={0.5}
        className={classes.stars}
        readOnly
      />
    </div>
    {showInfoModal && <InfoModal
     title = {moreInfo.title}
     overview = {moreInfo.overview}
     backdropPath = {moreInfo.backdrop_path}
     voteCount = {moreInfo.vote_count}
     voteAverage = {moreInfo.vote_average}
     releaseData = {moreInfo.release_data}
     genres = {genre || 'Akcja'}
     onClose = {closeModalHandler}
     />}

    </React.Fragment>
  );
};

export default MovieItem;
