import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import WatchTrailerIcon from "../cardIcons/watchTrailerIcon"; 

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, trailer }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root, backgroundColor: "#666666" }}> 
  <li>
    <Chip 
      label="Genres" 
      sx={{ 
        ...chip, 
        backgroundColor: "#8F4700", 
        color: "#FFFFFF"
      }} 
    />
  </li>
  {movie.genres.map((g) => (
    <li key={g.name}>
      <Chip 
        label={g.name} 
        sx={{ 
          ...chip, 
          backgroundColor: "#E0E0E1", 
          color: "#09070D" 
        }} 
      />
    </li>
  ))}
</Paper>

<Paper component="ul" sx={{ ...root, backgroundColor: "#666666" }}> 
  <Chip 
    icon={<AccessTimeIcon />} 
    label={`${movie.runtime} min.`} 
    sx={{ 
      ...chip, 
      backgroundColor: "#E0E0E1", 
      color: "#09070D" 
    }} 
  />
  <Chip 
    icon={<StarRate />} 
    label={`${movie.vote_average} (${movie.vote_count})`} 
    sx={{ 
      ...chip, 
      backgroundColor: "#E0E0E1", 
      color: "#09070D" 
    }} 
  />
  <Chip 
    label={`Released: ${movie.release_date}`} 
    sx={{ 
      ...chip, 
      backgroundColor: "#E0E0E1", 
      color: "#09070D" 
    }} 
  />
</Paper>


<Paper component="ul" sx={{ ...root, backgroundColor: "#666666" }}> 
  <li>
    <Chip 
      label="Production Countries" 
      sx={{ 
        ...chip, 
        backgroundColor: "#8F4700", 
        color: "#FFFFFF"
      }} 
    />
  </li>
  {movie.production_countries && movie.production_countries.length > 0 ? (
    movie.production_countries.map((country) => (
      <li key={country.iso_3166_1}>
        <Chip 
          label={country.name} 
          sx={{ 
            ...chip, 
            backgroundColor: "#E0E0E1", 
            color: "#09070D" 
          }} 
        />
      </li>
    ))
  ) : (
    <li>
      <Chip label="Unknown" sx={{ ...chip }} />
    </li>
  )}
</Paper>


      {trailer && (
        <div>
          <Typography variant="h6" component="h4">
            Watch Trailer
          </Typography>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Add WatchTrailerIcon */}
      {trailer && <WatchTrailerIcon trailerKey={trailer} />}

      <Fab
    variant="extended"
    onClick={() => setDrawerOpen(true)}
    sx={{
    position: "fixed",
    bottom: "1em",
    right: "1em",
    backgroundColor: "#8F4700",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#8F4700", 
      },
    }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
