import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Alert,
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Movie as MovieIcon, SearchOff as NoResultsIcon } from '@mui/icons-material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('query');
  const [page, setPage] = useState(1);
  
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDY1NzM0ZjNlM2IxMDk0MTEzNjRjMzRlNGI1MDAyYyIsInN1YiI6IjY2NDRhNmZiNGVjNjY1ODBkMGVlYTMyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BApYsoZnnAmhTEgS_h022LArcrQw9hvP6hdA-Bw9mdQ'
          }
        };

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}`,
          options
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setResults(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB API limits to 500 pages
      } catch (err) {
        console.error('Search error:', err);
        setError(err.message || 'Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!searchQuery) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>
          Please enter a search query to see results
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        p: 3
      }}>
        <NoResultsIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          No results found for "{searchQuery}"
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try different keywords or check your spelling
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Search Results for "{searchQuery}"
      </Typography>

      <Grid container spacing={3}>
        {results.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: theme.shadows[6]
                }
              }}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <CardMedia
                component="img"
                image={
                  movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : '/no-poster.png' // Fallback image
                }
                alt={movie.title}
                sx={{ 
                  aspectRatio: '2/3',
                  objectFit: 'cover'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  gutterBottom 
                  variant="subtitle1" 
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown year'}
                </Typography>
                {movie.vote_average > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {movie.vote_average.toFixed(1)}/10
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
            sx={{ '& .MuiPaginationItem-root': { color: 'text.primary' } }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;