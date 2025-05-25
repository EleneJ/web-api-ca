import React, { useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";  
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylistIcon"; 

const UpcomingMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["upcoming"],
        queryFn: getUpcomingMovies,
    });

    const { addToPlaylist } = useContext(MoviesContext);

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => (
                <AddToPlaylistIcon movie={movie} />
            )}
        />
    );
};

export default UpcomingMoviesPage;