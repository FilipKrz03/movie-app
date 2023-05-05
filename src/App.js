import React , {useState , useEffect} from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import ExploreSection from "./Components/ExploreSection/ExploreSection";
import SearchedMovies from "./Components/SearchedMovies/SearchedMovies";

function App() {

  const [searchedMovies , setSearchedMovies] = useState('');
  const [moviesToFetch , setMoviesToFetch] = useState('');

  const searchMovieHandler = movies => {
    setSearchedMovies(movies);
  }

  const closeSearchHandler = () => {
    setMoviesToFetch('');
  }

  useEffect(()=>{
    const identifer = setTimeout(()=>{
      setMoviesToFetch(searchedMovies);
    }, 500)
    return () => { 
      clearTimeout(identifer);
    }
  }, [searchedMovies])


  return (
    <React.Fragment>
      <Header onSearch = {searchMovieHandler} onClose = {closeSearchHandler} />
      {moviesToFetch === '' && <Hero />}
      {moviesToFetch !== '' && <SearchedMovies movies = {moviesToFetch}/> }
      <ExploreSection />
    </React.Fragment>
  );
}

export default App;
