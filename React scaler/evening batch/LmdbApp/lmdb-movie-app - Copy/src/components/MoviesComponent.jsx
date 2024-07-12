import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import MovieCardComponent from "./MovieCardComponent";
import PaginationComponent from "./PaginationComponent";

function MoviesComponent() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [watchlist, setWatchlist] = useState([]);

  const fetchMoviesList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=2af4c018ae5207101f6076ee341dc30d&language=en-US&page=${pageNo}`
      );
      console.log(response);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [pageNo]);

  useEffect(() => {
    fetchMoviesList();
  }, [fetchMoviesList]);

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  const addToWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter(
      (watchlistMovie) => watchlistMovie.id !== movie.id
    );
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  console.log(watchlist);

  const handleNext = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  const handlePrev = () => {
    setPageNo((prevPageNo) => (prevPageNo > 1 ? prevPageNo - 1 : 1));
  };

  return (
    <div className="w-full pt-12 pb-4 px-12">
      <div className="flex justify-center gap-10 flex-wrap">
        {movies.map((movie) => (
          <MovieCardComponent
            key={movie.id}
            movie={movie}
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
            removeFromWatchlist={removeFromWatchlist}
          />
        ))}
      </div>

      <PaginationComponent
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default MoviesComponent;
