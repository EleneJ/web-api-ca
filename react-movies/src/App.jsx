import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PlaylistPage from "./pages/playlistPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";
import PrivateRoute from "./components/PrivateRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div style={{
      backgroundColor: "#97979B",
      color: "#09070D",
      minHeight: "100vh",
      margin: "0",
      padding: "0"
    }}>
      
      <MoviesContextProvider>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route
  path="/movies/favorites"
  element={
    <PrivateRoute>
      <FavoriteMoviesPage />
    </PrivateRoute>
  }
/>
        </Routes>
      </MoviesContextProvider>
    </div>
  );
};

export default App;
