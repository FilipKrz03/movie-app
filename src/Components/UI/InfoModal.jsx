import React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Rating } from "@mui/material";
import classes from './InfoModal.module.scss';

const Backdrop = props => {
    return <div className={classes.backdrop}></div>
}


const ModalOverlay = props => {

    return(
        <div className={classes.modal}>
            <CloseIcon className={classes.close} fontSize='large' onClick={props.onClose} />
        <img src={`https://image.tmdb.org/t/p/original/${props.backdropPath}`} className={classes.poster} alt='poster of movie' />
        <h1>{props.title}</h1>
       <span className={classes.type}> Gatunek : <p className={classes.variable}>{props.genres}</p> </span>
        <p className={classes.overview}>{props.overview}</p>
        <span>Rok produkcji  : <span className={classes.variable}> {props.releaseData || 2023} </span> </span>
        <span>Liczba ocen : <span className={classes.variable}> {props.voteCount} </span> </span>
        <div className={classes.rating}>
        <Rating
        value={props.voteAverage / 2}
        precision={0.5}
        className={classes.variable}
        readOnly
      />
       <span className={classes.votes}>{(props.voteAverage / 2).toFixed(2)} </span>
      </div>
        </div>
    )
}

const overlays = document.getElementById('overlays');

const InfoModal = props => {
return(
    <React.Fragment>
 {createPortal(
    <Backdrop /> ,
    overlays
 )}
 {createPortal(
    <ModalOverlay
    title = {props.title}
    backdropPath = {props.backdropPath}
    overview = {props.overview}
    releaseData = {props.releaseData}
    voteCount = {props.voteCount}
    voteAverage = {props.voteAverage}
    genres = {props.genres}
    onClose = {props.onClose}
    /> , 
    overlays
 )}
    </React.Fragment>
)        
}


export default InfoModal;