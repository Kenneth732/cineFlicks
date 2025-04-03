import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  useTheme, 
  useMediaQuery,
  alpha,
  styled 
} from '@mui/material';
import { 
  PlayArrow as PlayIcon, 
  Add as AddIcon,
  Star as StarIcon,
  Info as InfoIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury glass card component
const GlassCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  right: '5%',
  bottom: '10%',
  width: '25%',
  minWidth: 300,
  background: 'rgba(20, 20, 20, 0.4)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,215,0,0.15)',
  borderRadius: '12px',
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

// Floating diamond particles
const DiamondParticle = ({ size, delay }) => {
  return (
    <Box
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
        opacity: [0, 0.8, 0],
        transition: {
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: delay
        }
      }}
      sx={{
        position: 'absolute',
        width: size,
        height: size,
        background: 'linear-gradient(135deg, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.2) 100%)',
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        zIndex: 1,
        filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))'
      }}
    />
  );
};

function Hero() {
  const { movies, handleSelectMovie, addToWatchLater } = useMovieContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (movies.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [movies]);

  const latestMovie = movies.length > 0 ? movies[currentIndex] : null;
  const backgroundImageUrl = latestMovie ? `https://image.tmdb.org/t/p/original/${latestMovie.backdrop_path}` : '';

  const trimOverview = (overview, maxLength) => {
    if (!overview) return '';
    if (overview.length <= maxLength) return overview;
    return overview.substring(0, maxLength) + '...';
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '80vh', md: '100vh' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, rgba(10,5,5,0.9) 0%, rgba(10,5,5,0.5) 50%, transparent 100%), url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform 10s ease'
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Diamond particles */}
      <AnimatePresence>
        {[...Array(15)].map((_, i) => (
          <DiamondParticle 
            key={i} 
            size={`${Math.random() * 10 + 5}px`} 
            delay={Math.random() * 5} 
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 4, md: 8, lg: 12 },
          maxWidth: { xs: '100%', md: '50%' },
          mt: { xs: 0, md: -10 }
        }}
      >
        {latestMovie && (
          <>
            {/* Featured badge */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '4px',
                px: 2,
                py: 1,
                mb: 3
              }}
            >
              <StarIcon sx={{ color: 'gold', fontSize: '1rem', mr: 1 }} />
              <Typography
                variant="overline"
                sx={{
                  color: 'gold',
                  letterSpacing: '4px',
                  fontSize: '0.7rem',
                  lineHeight: 1
                }}
              >
                PREMIERE SELECTION
              </Typography>
            </Box>

            {/* Title */}
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              variant="h1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                lineHeight: 1,
                mb: 3,
                background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              {latestMovie.title}
            </Typography>

            {/* Description */}
            <Typography
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8 }}
              variant="body1"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '90%'
              }}
            >
              {trimOverview(latestMovie.overview, 200)}
            </Typography>

            {/* Buttons */}
            <Box 
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              sx={{ display: 'flex', gap: 3, mt: 4 }}
            >
              <Button
                component={Link}
                // to={`/watch/${latestMovie.id}`}
                onClick={() => handleSelectMovie(latestMovie.id)}
                variant="contained"
                startIcon={<PlayIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
                  color: '#000',
                  px: 5,
                  py: 1.8,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  boxShadow: '0 8px 24px rgba(255,215,0,0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 28px rgba(255,215,0,0.4)',
                    background: 'linear-gradient(135deg, #FFE55C 0%, #E6C352 100%)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Watch Now
              </Button>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addToWatchLater(latestMovie)}
                sx={{
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.5)',
                  px: 5,
                  py: 1.8,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'gold',
                    color: 'gold',
                    background: 'rgba(255,215,0,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                My List
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* Glass info card */}
      {latestMovie && !isMobile && (
        <GlassCard
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ color: 'gold', mr: 1 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              {latestMovie.vote_average?.toFixed(1)} Rating
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            {latestMovie.release_date} • {Math.floor(latestMovie.runtime / 60)}h {latestMovie.runtime % 60}m
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {latestMovie.genres?.slice(0, 3).map(genre => (
              <Box
                key={genre.id}
                sx={{
                  px: 2,
                  py: 0.5,
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  borderRadius: '4px',
                  color: 'gold',
                  fontSize: '0.8rem'
                }}
              >
                {genre.name}
              </Box>
            ))}
          </Box>
          <Button
            variant="text"
            startIcon={<InfoIcon />}
            sx={{
              color: 'gold',
              px: 0,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            More Info
          </Button>
        </GlassCard>
      )}

      {/* Volume control */}
      <IconButton
        onClick={() => setMuted(!muted)}
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: 3,
          color: 'gold',
          background: 'rgba(0,0,0,0.5)',
          '&:hover': {
            background: 'rgba(255,215,0,0.2)'
          }
        }}
      >
        {muted ? <VolumeOffIcon /> : <VolumeIcon />}
      </IconButton>

      {/* Scrolling indicator */}
      {!isMobile && (
        <Box
          component={motion.div}
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
            Scroll to Explore
          </Typography>
          <Box sx={{ 
            width: '20px',
            height: '30px',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px'
          }}>
            <Box sx={{ 
              width: '4px',
              height: '8px',
              background: 'gold',
              borderRadius: '2px'
            }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Hero;