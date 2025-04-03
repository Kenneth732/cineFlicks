import React, { useRef, useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { 
  Box, 
  Typography, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  styled
} from '@mui/material';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  PlayArrow as PlayIcon,
  Star as StarIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury TV show card
const ShowCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  minWidth: 240,
  height: 360,
  borderRadius: '12px',
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(255, 215, 0, 0.2)',
    '& .show-overlay': {
      opacity: 1,
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)'
    },
    '& .action-buttons': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 160,
    height: 240
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

function TVShows() {
    const { tvShows, handleSelectMovie, error } = useMovieContext();
    const [hoveredShow, setHoveredShow] = useState(null);
    const scrollRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const scroll = (direction) => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -400 : 400,
          behavior: 'smooth'
        });
      }
    };

    if (error) {
      return (
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
            Error loading TV shows: {error}
          </Typography>
        </Box>
      );
    }

    if (!tvShows || tvShows.length === 0) {
      return (
        <Box sx={{ 
          color: 'rgba(255,255,255,0.7)', 
          textAlign: 'center', 
          p: 4,
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif' }}>
            Loading premium TV shows...
          </Typography>
        </Box>
      );
    }

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

        {/* Featured TV Shows Carousel */}
        <Box sx={{ 
          position: 'relative',
          mb: 10,
          '&:hover .scroll-button': {
            opacity: 1
          }
        }}>
          <Typography variant="h3" sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            mb: 4,
            px: { xs: 2, md: 6 },
            background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' },
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
            On The Air
          </Typography>

          {!isMobile && (
            <>
              <IconButton 
                className="scroll-button"
                onClick={() => scroll('left')}
                sx={{
                  position: 'absolute',
                  left: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'gold',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid gold',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  zIndex: 2,
                  '&:hover': {
                    background: 'rgba(255,215,0,0.2)',
                    opacity: 1
                  }
                }}
              >
                <LeftIcon fontSize="large" />
              </IconButton>
              <IconButton 
                className="scroll-button"
                onClick={() => scroll('right')}
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'gold',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid gold',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  zIndex: 2,
                  '&:hover': {
                    background: 'rgba(255,215,0,0.2)',
                    opacity: 1
                  }
                }}
              >
                <RightIcon fontSize="large" />
              </IconButton>
            </>
          )}

          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { display: 'none' },
              gap: '24px',
              py: '16px',
              px: { xs: 2, md: 6 }
            }}
          >
            {tvShows.map(show => (
              <ShowCard
                key={show.id}
                onMouseEnter={() => setHoveredShow(show.id)}
                onMouseLeave={() => setHoveredShow(null)}
                onClick={() => handleSelectMovie(show.id)}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt={show.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Overlay */}
                <Box className="show-overlay" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <Box>
                    <Typography variant="h6" sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      {show.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                      }}>
                        {show.vote_average?.toFixed(1)} | {show.first_air_date?.substring(0,4)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="action-buttons" sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'all 0.3s ease'
                  }}>
                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMovie(show.id);
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
                      {show.vote_average?.toFixed(1)}
                    </Typography>
                  </Box>
                )}
              </ShowCard>
            ))}
          </Box>
        </Box>

        {/* All TV Shows Grid */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          maxWidth: '1800px',
          mx: 'auto'
        }}>
          <Typography variant="h3" sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            mb: 6,
            px: { xs: 2, md: 0 },
            background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' },
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
            Premium Series Collection
          </Typography>

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
            {tvShows.map(show => (
              <ShowCard
                key={show.id}
                onMouseEnter={() => setHoveredShow(show.id)}
                onMouseLeave={() => setHoveredShow(null)}
                onClick={() => handleSelectMovie(show.id)}
              >
                <Box
                  component="img"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt={show.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <Box className="show-overlay" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <Box>
                    <Typography variant="h6" sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                      {show.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: 'gold', fontSize: '1rem' }} />
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                      }}>
                        {show.vote_average?.toFixed(1)} | {show.first_air_date?.substring(0,4)}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="action-buttons" sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'all 0.3s ease'
                  }}>
                    <ActionButton
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMovie(show.id);
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
                      {show.vote_average?.toFixed(1)}
                    </Typography>
                  </Box>
                )}
              </ShowCard>
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

export default TVShows;