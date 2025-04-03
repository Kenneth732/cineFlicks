import React, { useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  styled,
  Fade
} from '@mui/material';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  Star as StarIcon,
  Info as InfoIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovieContext } from '../context/MovieContext';
import LuxuryHero from './Hero';

// Diamond-shaped decorative elements
const Diamond = styled(Box)(({ size, top, left, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  background: 'linear-gradient(135deg, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 100%)',
  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  top: top,
  left: left,
  animation: `sparkle 3s ease-in-out ${delay}s infinite`,
  zIndex: 0,
  '@keyframes sparkle': {
    '0%': { opacity: 0.3, transform: 'scale(0.8)' },
    '50%': { opacity: 1, transform: 'scale(1.1)' },
    '100%': { opacity: 0.3, transform: 'scale(0.8)' }
  }
}));

// Glassmorphic card with 3D tilt effect
const LuxuryCard = styled(motion.div)({
  position: 'relative',
  minWidth: 240,
  height: 360,
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  background: 'rgba(20, 20, 20, 0.4)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,215,0,0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transformStyle: 'preserve-3d',
  '&:hover': {
    '& .card-content': {
      transform: 'translateY(0)',
    },
    '& .play-button': {
      opacity: 1,
      transform: 'scale(1)',
    }
  },
  '@media (max-width: 600px)': {
    minWidth: 160,
    height: 240
  }
});

// Floating action button
const FloatingAction = styled(motion.div)({
  position: 'absolute',
  bottom: 24,
  right: 24,
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
  zIndex: 2
});

function Home() {
    const { 
      movies, 
      latestMovies, 
      trendingMovies, 
      topRatedMovies, 
      upcomingMovies, 
      handleSelectMovie, 
      error 
    } = useMovieContext();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const scrollRefs = {
      latest: useRef(null),
      trending: useRef(null),
      topRated: useRef(null),
      upcoming: useRef(null)
    };

    const scroll = (ref, direction) => {
      if (ref.current) {
        ref.current.scrollBy({
          left: direction === 'left' ? -400 : 400,
          behavior: 'smooth'
        });
      }
    };

    if (error) return (
      <Box sx={{ 
        color: 'gold', 
        textAlign: 'center', 
        p: 4,
        background: 'rgba(10,5,5,0.9)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif' }}>
          Error loading content. Please try again later.
        </Typography>
      </Box>
    );

    const renderMovieSection = (title, movies, refKey) => (
      <Box sx={{ 
        mb: 10,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative diamonds */}
        <Diamond size="12px" top="20%" left="5%" delay={0} />
        <Diamond size="8px" top="70%" left="90%" delay={0.5} />
        <Diamond size="10px" top="40%" left="92%" delay={0.8} />

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4,
          px: { xs: 2, md: 6 },
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="h3" sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}>
            <Box component="span" sx={{
              width: '40px',
              height: '4px',
              background: 'gold',
              borderRadius: '2px'
            }} />
            {title}
            <Box component="span" sx={{
              width: '40px',
              height: '4px',
              background: 'gold',
              borderRadius: '2px'
            }} />
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                onClick={() => scroll(scrollRefs[refKey], 'left')}
                sx={{
                  color: 'gold',
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,215,0,0.3)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <LeftIcon fontSize="large" />
              </IconButton>
              <IconButton 
                onClick={() => scroll(scrollRefs[refKey], 'right')}
                sx={{
                  color: 'gold',
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,215,0,0.3)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <RightIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box sx={{ 
          position: 'relative',
          px: { xs: 2, md: 6 }
        }}>
          <Box
            ref={scrollRefs[refKey]}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              gap: '24px',
              py: '16px',
              px: '8px'
            }}
          >
            <AnimatePresence>
              {movies && movies.map(movie => (
                <LuxuryCard
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover="hover"
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => handleSelectMovie(movie.id)}
                >
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      zIndex: -1
                    }}
                  />

                  {/* Glow effect */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,215,0,0.2) 0%, transparent 70%)`,
                    opacity: hoveredMovie === movie.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />

                  {/* Card content overlay */}
                  <Box className="card-content" sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    p: 3,
                    transform: 'translateY(100px)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {movie.vote_average?.toFixed(1)} | {movie.release_date?.substring(0,4)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Play button */}
                  <FloatingAction 
                    className="play-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredMovie === movie.id ? 1 : 0, 
                      scale: hoveredMovie === movie.id ? 1 : 0.8 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <PlayIcon sx={{ color: '#000' }} />
                  </FloatingAction>
                </LuxuryCard>
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    );

    return (
      <Box sx={{ 
        background: 'linear-gradient(135deg, #050505 0%, #121212 100%)',
        minHeight: '100vh',
        color: theme.palette.common.white,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Background decorative elements */}
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 1,
              height: 1,
              background: 'rgba(255,215,0,0.03)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'rotate(45deg)'
            }}
          />
        ))}

        <LuxuryHero />
        
        <Box sx={{ 
          px: { xs: 0, md: 0 },
          py: 6,
          maxWidth: '1800px',
          mx: 'auto',
          position: 'relative',
          zIndex: 1
        }}>
          {renderMovieSection('Latest Releases', latestMovies, 'latest')}
          {renderMovieSection('Trending Now', trendingMovies, 'trending')}
          {renderMovieSection('Top Rated', topRatedMovies, 'topRated')}
          {renderMovieSection('Coming Soon', upcomingMovies, 'upcoming')}

          {/* Now Playing Grid */}
          <Box sx={{ 
            mt: 12,
            px: { xs: 2, md: 6 },
            position: 'relative'
          }}>
            {/* Decorative diamonds */}
            <Diamond size="16px" top="10%" left="2%" delay={0.2} />
            <Diamond size="12px" top="30%" left="95%" delay={0.7} />

            <Typography variant="h3" sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 6,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}>
              <Box component="span" sx={{
                width: '40px',
                height: '4px',
                background: 'gold',
                borderRadius: '2px'
              }} />
              Now Playing
              <Box component="span" sx={{
                width: '40px',
                height: '4px',
                background: 'gold',
                borderRadius: '2px'
              }} />
            </Typography>
            
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)'
              },
              gap: 4,
              px: { xs: 2, md: 0 }
            }}>
              {movies && movies.map(movie => (
                <LuxuryCard
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => handleSelectMovie(movie.id)}
                >
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      zIndex: -1
                    }}
                  />

                  {/* Glow effect */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,215,0,0.2) 0%, transparent 70%)`,
                    opacity: hoveredMovie === movie.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />

                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    p: 3,
                    opacity: hoveredMovie === movie.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: 1
                    }}>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {movie.vote_average?.toFixed(1)} | {movie.release_date?.substring(0,4)}
                      </Typography>
                    </Box>
                  </Box>

                  <FloatingAction 
                    animate={{ 
                      opacity: hoveredMovie === movie.id ? 1 : 0, 
                      scale: hoveredMovie === movie.id ? 1 : 0.8 
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <PlayIcon sx={{ color: '#000' }} />
                  </FloatingAction>
                </LuxuryCard>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
}

export default Home;