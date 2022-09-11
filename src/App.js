import React, { useState, useCallback, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // if we don't use callback dis func is created every time and useEffect runs on each render cycle creating an infinite loop
  const fetchMoviesHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null)
    try {
      const response = await fetch('https://swapi.py4e.com/api/films/')
      if (!response.ok) {
        throw new Error('something went wrong')
      }
      const data = await response.json();

      const transformedMovies = data['results'].map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        };
      })
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [])

  useEffect( () => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading....</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
