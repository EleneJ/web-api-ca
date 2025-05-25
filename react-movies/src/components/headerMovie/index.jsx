import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper 
        component="div" 
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: 1.5,
          margin: 0,
          backgroundColor: "#666666",  
          color: "#000000"             
      }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
      <ArrowBackIcon sx={{ color: "#8F4700" }} fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
    {movie.title}
    </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
      <ArrowForwardIcon sx={{ color: "#8F4700" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;