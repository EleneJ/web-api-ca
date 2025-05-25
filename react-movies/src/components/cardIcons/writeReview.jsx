import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}
      state={{
          movieId: movie.id,
      }}
    >
      <RateReviewIcon sx={{ color: "#8F4700" }} fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;