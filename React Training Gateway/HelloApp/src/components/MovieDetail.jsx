import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0b5415eb9bf023d556ef265b425e0e4a`)
    .then(res => res.json())
    .then(data => setMovieDetail(data))
    .catch(error => console.error('Error fetching movie detail:', error));
  }, [])


  return (
    <div className="movieDetailWrapper">
      <h1>Movie Detail</h1>
      <div className="movieDetail"> 
            <h2>{movieDetail.title}</h2>
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
            />           
           <p>{movieDetail.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
