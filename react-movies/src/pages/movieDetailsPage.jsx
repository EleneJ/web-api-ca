import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";  
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getRecommendedMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import WatchTrailerIcon from "../components/cardIcons/watchTrailerIcon.jsx";

const MoviePage = (props) => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState(null);

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  const { data: recommendedMovies, isPending: isPendingRecommended } = useQuery({
    queryKey: ["recommended", { id }],
    queryFn: getRecommendedMovies,
  });

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailer(data.results[0].key); 
      }
    };
    if (id) {
      fetchTrailer();
    }
  }, [id]);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} trailer={trailer} /> 
            {trailer && <WatchTrailerIcon trailerKey={trailer} />}
            <div>
              <h2>Suggested Movies</h2>
              {isPendingRecommended ? (
                <Spinner />
              ) : (
                <ul>
                  {recommendedMovies?.results?.length > 0 ? (
                    recommendedMovies.results.map((suggestedMovie) => (
                      <li key={suggestedMovie.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${suggestedMovie.poster_path}`}
                          alt={suggestedMovie.title}
                        />
                        <p>{suggestedMovie.title}</p>
                      </li>
                    ))
                  ) : (
                    <p>No recommendations available.</p>
                  )}
                </ul>
              )}
            </div>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
