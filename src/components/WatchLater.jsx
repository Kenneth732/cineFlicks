import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import './WatchLater.css';  // Create appropriate CSS styles for this component

function WatchLater() {
  const { watchLaterList } = useMovieContext();

  return (
    <div className="watch-later">
      <h2>Watch Later List</h2>
      {watchLaterList.length === 0 ? (
        <p>No movies added to the watch later list.</p>
      ) : (
        <ul>
          {watchLaterList.map((movie) => (
            <li key={movie.id}>
              <Link to={`/watch/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <div>{movie.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchLater;
