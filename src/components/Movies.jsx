import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery,
  styled,
  IconButton
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Info as InfoIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury movie card with glass effect
const LuxuryCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(255, 215, 0, 0.2)',
    '& .card-overlay': {
      opacity: 1,
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)'
    },
    '& .action-buttons': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}));

// Floating action button
const ActionButton = styled(motion.div)({
  position: 'absolute',
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  zIndex: 2
});

function Movies() {
    const { movies, handleSelectMovie } = useMovieContext();
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Box sx={{
        background: 'linear-gradient(135deg, #050505 0%, #121212 100%)',
        minHeight: '100vh',
        py: 8,
        px: { xs: 2, sm: 4, md: 6, lg: 10 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: 'rgba(255,215,0,0.1)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 100px 80px rgba(255,215,0,0.03)',
              zIndex: 0
            }}
          />
        ))}

        {/* Main content */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          maxWidth: '1800px',
          mx: 'auto'
        }}>
          {/* Section header */}
          <Typography variant="h2" sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            mb: 6,
            px: { xs: 2, md: 0 },
            background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            '&::before, &::after': {
              content: '""',
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)'
            }
          }}>
            Cinematic Collection
          </Typography>

          {/* Movie grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
              xl: 'repeat(6, 1fr)'
            },
            gap: { xs: 2, md: 3 },
            px: { xs: 1, md: 0 }
          }}>
            {movies.map(movie => (
              <LuxuryCard
                key={movie.id}
                layout
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
                onClick={() => handleSelectMovie(movie.id)}
              >
                {/* Movie poster */}
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    aspectRatio: '2/3'
                  }}
                />

                {/* Overlay */}
                <Box className="card-overlay" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  {/* Movie info */}
                  <Box>
                    <Typography variant="h6" sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: 0.5,
                      lineHeight: 1.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      {movie.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                      }}>
                        {movie.vote_average?.toFixed(1)} | {movie.release_date?.substring(0,4)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action buttons */}
                  <Box className="action-buttons" sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'all 0.3s ease'
                  }}>
                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMovie(movie.id);
                      }}
                    >
                      <PlayIcon sx={{ color: '#000' }} />
                    </ActionButton>

                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      sx={{ background: 'rgba(0,0,0,0.7)', border: '1px solid gold' }}
                    >
                      <InfoIcon sx={{ color: 'gold', fontSize: '1.2rem' }} />
                    </ActionButton>
                  </Box>
                </Box>

                {/* Rating badge */}
                {!isMobile && (
                  <Box sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid gold',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {movie.vote_average?.toFixed(1)}
                    </Typography>
                  </Box>
                )}
              </LuxuryCard>
            ))}
          </Box>
        </Box>

        {/* Floating decorative diamonds */}
        <AnimatePresence>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{
                y: Math.random() * 100 - 50,
                x: Math.random() * 100 - 50,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              animate={{
                y: Math.random() * 200 - 100,
                x: Math.random() * 200 - 100,
                opacity: [0, 0.4, 0],
                transition: {
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5
                }
              }}
              sx={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: 'gold',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                zIndex: 0,
                filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.5))'
              }}
            />
          ))}
        </AnimatePresence>
      </Box>
    );
}

export default Movies;