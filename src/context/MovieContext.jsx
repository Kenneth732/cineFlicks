import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1NzM0ZjNlM2IxMDk0MTEzNjRjMzRlNGI1MDAyYyIsInN1YiI6IjY2NDRhNmZiNGVjNjY1ODBkMGVlYTMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BApYsoZnnAmhTEgS_h022LArcrQw9hvP6hdA-Bw9mdQ',
  },
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesData('movie/now_playing', setMovies);
    fetchMoviesData('movie/now_playing', setLatestMovies);
    fetchMoviesData('trending/movie/day?page=2', setTrendingMovies);
    fetchMoviesData('movie/top_rated', setTopRatedMovies);
    fetchMoviesData('movie/upcoming', setUpcomingMovies);
    fetchMoviesData('tv/on_the_air', setTvShows);
  }, []);

  useEffect(() => {
    if (selectedMovieId) {
      fetchMovieVideos(selectedMovieId);
    }
  }, [selectedMovieId]);

  const fetchMoviesData = async (endpoint, setterFunction) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}?language=en-US&page=1`, API_OPTIONS);
      const data = await response.json();
      setterFunction(data.results);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  const fetchMovieVideos = async (movieId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const data = await response.json();
      setVideos(data.results);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching videos');
    }
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const addToWatchLater = (movie) => {
    setWatchLaterList((prevList) =>
      prevList.some((m) => m.id === movie.id) ? prevList : [...prevList, movie]
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        latestMovies,
        trendingMovies,
        topRatedMovies,
        upcomingMovies,
        tvShows,
        selectedMovieId,
        videos,
        error,
        handleSelectMovie,
        fetchMoviesData,
        watchLaterList,
        addToWatchLater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
