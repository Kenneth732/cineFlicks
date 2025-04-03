import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import './HeroPlayMovie.css';

function HeroPlayMovie() {
  const { selectedMovieId, videos, loading, error } = useMovieContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!selectedMovieId) return null;

  const video = videos.find(video => video.type === 'Trailer');

  if (!video) return <div className="no-video-message">No video available</div>;

  return (
    <div className="hero-play-section contain">
      <div className="hero-video-overlay"></div>
      <iframe
        className="hero-video-player"
        src={`https://www.youtube.com/embed/${video.key}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video Player"
      ></iframe>
    </div>
  );
}

export default HeroPlayMovie;
