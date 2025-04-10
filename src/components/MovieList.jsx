

import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import './MovieList.css';

const MovieList = () => {
  const { movies, handleSelectMovie } = useMovieContext();

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-heading">Now Playing</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => handleSelectMovie(movie.id)}>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;



























