// https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=1

import { useEffect, useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, []); 
 
  return (
    <div className="movieListWrapper">
      <h1>Movie List</h1>
      <div className="movieList">
        {movies.map((movie) => (
          <div className="movie">
            <img
              className="backgroundMovieImg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
            <h2>{movie.title}</h2>
            <button>Add to Favourite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
