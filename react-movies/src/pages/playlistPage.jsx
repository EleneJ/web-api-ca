import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylistIcon";

const PlaylistPage = () => {
  const { playlist } = useContext(MoviesContext);

  return (
    <PageTemplate
      title="My Playlist"
      movies={playlist} 
      action={(movie) => <RemoveFromPlaylistIcon movie={movie} />}
    />
  );
};

export default PlaylistPage;