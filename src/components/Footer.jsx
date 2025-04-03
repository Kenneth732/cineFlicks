import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Divider, 
  IconButton,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
  Pinterest as PinterestIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const LuxuryDivider = styled(Divider)({
  background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.5), transparent)',
  height: '1px',
  margin: '24px 0'
});

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'block',
  marginBottom: '8px',
  '&:hover': {
    color: 'gold',
    transform: 'translateX(4px)'
  }
}));

const SocialIcon = styled(IconButton)({
  color: 'rgba(255,255,255,0.7)',
  border: '1px solid rgba(255,255,255,0.2)',
  transition: 'all 0.3s ease',
  margin: '0 4px',
  '&:hover': {
    color: 'gold',
    borderColor: 'rgba(255,215,0,0.5)',
    backgroundColor: 'rgba(255,215,0,0.1)',
    transform: 'translateY(-3px)'
  }
});

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(10, 5, 5, 0.95)',
        backdropFilter: 'blur(10px)',
        color: 'rgba(255,255,255,0.7)',
        padding: '60px 0 30px',
        borderTop: '1px solid rgba(255,215,0,0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #FFD700, #D4AF37)',
          opacity: 0.3
        }
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid item xs={12} md={3}>
            <Typography 
              variant="h5" 
              sx={{
                mb: 3,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                letterSpacing: '1px',
                color: 'gold',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LanguageIcon sx={{ mr: 1, fontSize: '1.8rem' }} />
              CINEMATICA
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7 }}>
              The ultimate destination for cinephiles. Discover, explore, and enjoy the finest cinematic experiences.
            </Typography>
            <Box sx={{ display: 'flex', mt: 3 }}>
              <SocialIcon aria-label="Facebook">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon aria-label="Twitter">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon aria-label="Instagram">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon aria-label="YouTube">
                <YouTubeIcon />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5px'
              }}
            >
              Navigation
            </Typography>
            <FooterLink href="#" underline="none">Home</FooterLink>
            <FooterLink href="#" underline="none">Movies</FooterLink>
            <FooterLink href="#" underline="none">TV Shows</FooterLink>
            <FooterLink href="#" underline="none">My List</FooterLink>
            <FooterLink href="#" underline="none">Trending</FooterLink>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5px'
              }}
            >
              Categories
            </Typography>
            <FooterLink href="#" underline="none">Action</FooterLink>
            <FooterLink href="#" underline="none">Drama</FooterLink>
            <FooterLink href="#" underline="none">Comedy</FooterLink>
            <FooterLink href="#" underline="none">Sci-Fi</FooterLink>
            <FooterLink href="#" underline="none">Horror</FooterLink>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5px'
              }}
            >
              Legal
            </Typography>
            <FooterLink href="#" underline="none">Terms</FooterLink>
            <FooterLink href="#" underline="none">Privacy</FooterLink>
            <FooterLink href="#" underline="none">Cookies</FooterLink>
            <FooterLink href="#" underline="none">Copyright</FooterLink>
          </Grid>

          <Grid item xs={6} sm={3} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5px'
              }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              123 Cinema Avenue<br />
              Hollywood, CA 90210
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              support@cinematica.com<br />
              +1 (555) 123-4567
            </Typography>
            <FooterLink href="#" underline="none">Help Center</FooterLink>
          </Grid>
        </Grid>

        <LuxuryDivider />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} CINEMATICA. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 0 }}>
            <FooterLink href="#" underline="none" sx={{ mx: 2 }}>Sitemap</FooterLink>
            <FooterLink href="#" underline="none" sx={{ mx: 2 }}>Careers</FooterLink>
            <FooterLink href="#" underline="none" sx={{ mx: 2 }}>Press</FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;