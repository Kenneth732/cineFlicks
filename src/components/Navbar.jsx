import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  styled,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  AccountCircle as ProfileIcon,
  Home as HomeIcon,
  Movie as MovieIcon,
  LiveTv as TvIcon,
  List as ListIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Logo1 from '../Assets/logo1.png';

// Premium styled components
const GlassSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  backdropFilter: 'blur(12px)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,215,0,0.7)',
}));

const PremiumInputBase = styled(InputBase)(({ theme }) => ({
  color: 'rgba(255,255,255,0.9)',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width', 'opacity'], {
      duration: theme.transitions.duration.standard,
    }),
    width: '100%',
    fontSize: '0.9rem',
    letterSpacing: '0.5px',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '24ch',
      },
    },
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  padding: '8px 16px',
  margin: '0 4px',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,215,0,0.1)',
    '&::after': {
      width: '100%',
      opacity: 1,
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: 'gold',
    transition: 'all 0.3s ease',
    opacity: 0,
  },
  '&.Mui-selected': {
    '&::after': {
      width: '100%',
      opacity: 1,
    }
  }
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'rgba(15,10,10,0.95)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          border: '1px solid rgba(255,215,0,0.2)',
          minWidth: '220px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, gold, transparent)',
          }
        },
        '& .MuiMenuItem-root': {
          padding: '12px 20px',
          '&:hover': {
            backgroundColor: 'rgba(255,215,0,0.1)',
          },
          '&:not(:last-child)': {
            borderBottom: '1px solid rgba(255,215,0,0.05)',
          },
        },
      }}
    >
      <MenuItem 
        component={Link} 
        to="/profile" 
        onClick={handleMenuClose}
        sx={{ gap: 2 }}
      >
        <ProfileIcon sx={{ color: 'gold', fontSize: '1.2rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500 }}>Profile</Typography>
      </MenuItem>
      <MenuItem 
        component={Link} 
        to="/settings" 
        onClick={handleMenuClose}
        sx={{ gap: 2 }}
      >
        <SettingsIcon sx={{ color: 'gold', fontSize: '1.2rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500 }}>Settings</Typography>
      </MenuItem>
      <Divider sx={{ borderColor: 'rgba(255,215,0,0.1)', my: '4px !important' }} />
      <MenuItem 
        component={Link} 
        to="/logout" 
        onClick={handleMenuClose}
        sx={{ gap: 2 }}
      >
        <LogoutIcon sx={{ color: 'gold', fontSize: '1.2rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500 }}>Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'rgba(15,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          color: 'white',
          border: '1px solid rgba(255,215,0,0.2)',
          width: '320px',
          maxWidth: 'calc(100vw - 40px)',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          padding: '8px 0',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, gold, transparent)',
          }
        },
        '& .MuiMenuItem-root': {
          padding: '14px 24px',
          '&:hover': {
            backgroundColor: 'rgba(255,215,0,0.1)',
          },
        },
      }}
    >
      <MenuItem 
        component={Link} 
        to="/" 
        onClick={handleMobileMenuClose}
        sx={{ gap: 2 }}
      >
        <HomeIcon sx={{ color: 'gold', fontSize: '1.4rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Home</Typography>
      </MenuItem>
      <MenuItem 
        component={Link} 
        to="/movies" 
        onClick={handleMobileMenuClose}
        sx={{ gap: 2 }}
      >
        <MovieIcon sx={{ color: 'gold', fontSize: '1.4rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Movies</Typography>
      </MenuItem>
      <MenuItem 
        component={Link} 
        to="/tv-shows" 
        onClick={handleMobileMenuClose}
        sx={{ gap: 2 }}
      >
        <TvIcon sx={{ color: 'gold', fontSize: '1.4rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>TV Shows</Typography>
      </MenuItem>
      <MenuItem 
        component={Link} 
        to="/my-list" 
        onClick={handleMobileMenuClose}
        sx={{ gap: 2 }}
      >
        <ListIcon sx={{ color: 'gold', fontSize: '1.4rem' }} /> 
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>My List</Typography>
      </MenuItem>
      
      <Divider sx={{ 
        borderColor: 'rgba(255,215,0,0.1)', 
        my: '8px !important',
        mx: 2,
      }} />
      
      <Box 
        component="form" 
        onSubmit={handleSearchSubmit} 
        sx={{ 
          px: 3, 
          py: 2,
          '&:focus-within': {
            '& .MuiInputBase-input': {
              width: '100%',
            }
          }
        }}
      >
        <GlassSearch>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <PremiumInputBase
            placeholder="Search movies, shows..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </GlassSearch>
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{
          background: 'linear-gradient(to bottom, rgba(5,2,2,0.95) 0%, rgba(5,2,2,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
          borderBottom: '1px solid rgba(255,215,0,0.15)',
          zIndex: theme.zIndex.drawer + 1,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          padding: { xs: '0 8px', sm: '0 16px', md: '0 24px' },
          minHeight: '70px !important',
        }}>
          {/* Logo */}
          <Box 
            component={motion.div}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 2,
              cursor: 'pointer',
            }}
          >
            <IconButton
              component={Link}
              to="/"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ 
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              {/* <img 
                // src={Logo1} 
                alt="Logo" 
                style={{ 
                  height: '42px',
                  filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.7))',
                  transition: 'all 0.3s ease',
                }} 
              /> */}
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                ml: 1.5,
                display: { xs: 'none', sm: 'block' },
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
                letterSpacing: '1.5px',
                background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px rgba(255,215,0,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              CINEFLICKS
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              mx: 2,
            }}>
              <NavButton
                component={Link}
                to="/"
                color="inherit"
                sx={{
                  '&:hover': { color: 'gold' },
                }}
              >
                <HomeIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> 
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Home</Typography>
              </NavButton>
              <NavButton
                component={Link}
                to="/movies"
                color="inherit"
                sx={{
                  '&:hover': { color: 'gold' },
                }}
              >
                <MovieIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> 
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Movies</Typography>
              </NavButton>
              <NavButton
                component={Link}
                to="/tv-shows"
                color="inherit"
                sx={{
                  '&:hover': { color: 'gold' },
                }}
              >
                <TvIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> 
                <Typography variant="body1" sx={{ fontWeight: 500 }}>TV Shows</Typography>
              </NavButton>
              <NavButton
                component={Link}
                to="/my-list"
                color="inherit"
                sx={{
                  '&:hover': { color: 'gold' },
                }}
              >
                <ListIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> 
                <Typography variant="body1" sx={{ fontWeight: 500 }}>My List</Typography>
              </NavButton>
            </Box>
          )}

          {/* Search and Profile */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
          }}>
            {!isMobile && (
              <Box 
                component={motion.div}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                sx={{ mr: 1 }}
              >
                <Box component="form" onSubmit={handleSearchSubmit}>
                  <GlassSearch
                    component={motion.div}
                    animate={{
                      boxShadow: searchFocused 
                        ? '0 0 0 2px rgba(255,215,0,0.3)'
                        : 'none',
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <PremiumInputBase
                      placeholder="Search movies, shows..."
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                    />
                  </GlassSearch>
                </Box>
              </Box>
            )}

            {!isMobile && (
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    color: 'gold',
                    backgroundColor: 'rgba(255,215,0,0.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Badge 
                  badgeContent={4} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: 4,
                      top: 4,
                      border: '2px solid rgba(10,5,5,0.8)',
                    }
                  }}
                >
                  <NotificationsIcon fontSize="medium" />
                </Badge>
              </IconButton>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ 
                '&:hover': { 
                  color: 'gold',
                  backgroundColor: 'rgba(255,215,0,0.1)',
                },
                transition: 'all 0.3s ease',
                p: '8px',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  padding: '2px',
                  background: isMenuOpen 
                    ? 'linear-gradient(135deg, gold, #D4AF37)' 
                    : 'transparent',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                }
              }}
            >
              <ProfileIcon fontSize="large" />
            </IconButton>

            {isMobile && (
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                sx={{ 
                  '&:hover': { 
                    color: 'gold',
                    backgroundColor: 'rgba(255,215,0,0.1)',
                  },
                  ml: 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {isMobileMenuOpen ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <AnimatePresence>
        {isMobileMenuOpen && renderMobileMenu}
      </AnimatePresence>
      
      {renderMenu}
    </Box>
  );
}

export default Navbar;