import React , {useEffect , useState} from "react";
import useHttp from "../../hooks/useHttp";
import MovieItem from "../UI/MovieItem";
import { TypeAnimation } from "react-type-animation";
import classes from './SearchedMovies.module.scss';

const SearchedMovies = props => {

    const {sendRequest:getMovies , isError} = useHttp();
    const [movies , setMovies] = useState([]);
   

    useEffect(()=>{
        getMovies
        (`https://api.themoviedb.org/3/search/movie?api_key=bd1cb6e5c7a90f4635d43e6a6ea51ffe&language=pl-Pl&query=${props.movies}` , 
        data => setMovies(data.results));
    }, [props , getMovies])

    
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

    if(movieItems.length === 0){
        return(
           <TypeAnimation
           className={classes.typed}
           sequence={[
            'Nie znaleziono zadnego filmu !' , 
            5000
           ]}
           />
        )
    }

      return (
        <div className={classes.movies}>
            {movieItems}
        </div>
      )

}

export default React.memo(SearchedMovies);