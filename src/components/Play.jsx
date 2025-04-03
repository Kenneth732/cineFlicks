import React, { useState, useEffect } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { 
  Box, 
  IconButton, 
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  Fade,
  Backdrop
} from '@mui/material';
import {
  Close as CloseIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  PictureInPictureAlt as PipIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Luxury glass overlay
const GlassOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(10, 5, 5, 0.7)',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Floating control panel
const ControlPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 40,
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(20, 20, 20, 0.6)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,215,0,0.2)',
  borderRadius: '50px',
  padding: theme.spacing(1, 3),
  display: 'flex',
  gap: theme.spacing(2),
  zIndex: 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
}));

function Play() {
  const { selectedMovieId, videos, error, handleSelectMovie } = useMovieContext();
  const [showPlayer, setShowPlayer] = useState(true);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setShowPlayer(false);
    handleSelectMovie(null);
  };

  const toggleControls = () => {
    setShowControls(prev => !prev);
  };

  useEffect(() => {
    if (showPlayer) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPlayer, showControls]);

  if (error) {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,5,5,0.9)',
        zIndex: 9999,
        color: 'gold'
      }}>
        <Typography variant="h5">Error loading video: {error}</Typography>
      </Box>
    );
  }

  return (
    <AnimatePresence>
      {showPlayer && videos.length > 0 && (
        <Backdrop open={true} sx={{ zIndex: theme.zIndex.modal }}>
          {/* Main video container */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            sx={{
              position: 'relative',
              width: '90vw',
              height: '80vh',
              maxWidth: 1500,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(255,215,0,0.2)',
              border: '1px solid rgba(255,215,0,0.3)'
            }}
            onClick={toggleControls}
          >
            {/* Video iframe */}
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&mute=${muted ? 1 : 0}`}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Glass overlay when controls are visible */}
            {showControls && (
              <GlassOverlay>
                {/* Close button */}
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'gold',
                    background: 'rgba(0,0,0,0.5)',
                    '&:hover': {
                      background: 'rgba(255,215,0,0.2)'
                    }
                  }}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>

                {/* Movie title */}
                <Typography
                  variant="h3"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    fontFamily: '"Playfair Display", serif',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  Now Playing
                </Typography>

                {/* Control panel */}
                <ControlPanel
                  component={motion.div}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <IconButton
                    onClick={() => setMuted(!muted)}
                    sx={{ color: muted ? 'rgba(255,255,255,0.5)' : 'gold' }}
                  >
                    {muted ? <VolumeOffIcon /> : <VolumeIcon />}
                  </IconButton>
                  
                  <IconButton
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    sx={{ color: 'gold' }}
                  >
                    <FullscreenIcon />
                  </IconButton>
                  
                  <IconButton
                    onClick={() => setIsPip(!isPip)}
                    sx={{ color: 'gold' }}
                  >
                    <PipIcon />
                  </IconButton>
                </ControlPanel>
              </GlassOverlay>
            )}

            {/* Diamond decorations */}
            <Box
              component={motion.div}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
                zIndex: 0
              }}
            />
            <Box
              component={motion.div}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              sx={{
                position: 'absolute',
                bottom: -150,
                left: -150,
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
                zIndex: 0
              }}
            />
          </Box>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export default Play;