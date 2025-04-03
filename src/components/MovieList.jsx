

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





















































// // src/components/MovieList.jsx
// import React, { useState, useEffect } from 'react';
// import { useMovieContext } from '../context/MovieContext';

// const MovieList = () => {
//   const { handleSelectMovie } = useMovieContext();
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1NzM0ZjNlM2IxMDk0MTEzNjRjMzRlNGI1MDAyYyIsInN1YiI6IjY2NDRhNmZiNGVjNjY1ODBkMGVlYTMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BApYsoZnnAmhTEgS_h022LArcrQw9hvP6hdA-Bw9mdQ'
//       }
//     };

//     fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setMovies(data.results);
//       })
//       .catch(error => {
//         console.error('There was a problem with your fetch operation:', error);
//         setError(error.message || 'An error occurred while fetching data');
//       });
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Now Playing Movies</h2>
//       <div className="movie-list">
//         {movies.map(movie => (
//           <div key={movie.id} className="movie-card" onClick={() => handleSelectMovie(movie.id)}>
//             <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
//             <div className="movie-details">
//               <h3>{movie.title}</h3>
//               <p>Release Date: {movie.release_date}</p>
//               <p>{movie.overview}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieList;




































































































































































// // src/components/MovieList.jsx

// import React, { useState, useEffect } from 'react';

// const MovieList = ({ onSelectMovie }) => {
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1NzM0ZjNlM2IxMDk0MTEzNjRjMzRlNGI1MDAyYyIsInN1YiI6IjY2NDRhNmZiNGVjNjY1ODBkMGVlYTMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BApYsoZnnAmhTEgS_h022LArcrQw9hvP6hdA-Bw9mdQ'
//       }
//     };

//     fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3', options)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setMovies(data.results);
//       })
//       .catch(error => {
//         console.error('There was a problem with your fetch operation:', error);
//         setError(error.message || 'An error occurred while fetching data');
//       });
//   }, []);

//   const handleSelectMovie = movieId => {
//     onSelectMovie(movieId);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Now Playing Movies</h2>
//       <div className="movie-list">
//         {movies.map(movie => (
//           <div key={movie.id} className="movie-card" onClick={() => handleSelectMovie(movie.id)}>
//             <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
//             <div className="movie-details">
//               <h3>{movie.title}</h3>
//               <p>Release Date: {movie.release_date}</p>
//               <p>{movie.overview}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieList;
