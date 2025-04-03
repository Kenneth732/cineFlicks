import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import MyList from './components/MyList';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Logout from './components/Logout';
import Home from './components/Home';
import Hero from './components/Hero';
import Play from './components/Play';
import MovieList from './components/MovieList';
import HeroPlayMovie from './components/HeroPlayMovie';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import WatchLater from './components/WatchLater';  // Import the new component

function App() {
  return (
    <BrowserRouter>
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<HeroPlayMovie />} />
        <Route path='/hero' element={<Hero />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path='/movie-list' element={<MovieList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/watch-later" element={<WatchLater />} />  // Add new route
      </Routes>
      <Play />
      <Footer />
    </BrowserRouter>
  );
}

export default App;