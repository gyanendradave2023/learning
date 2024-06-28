const MovieDetail = () => {
  return (
    <div className="movieDetailWrapper">
      <h1>Movie Detail</h1>
      <div className="movieDetail"> 
             <h2>{'movie.title'}</h2>
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w500/${'movie.poster_path'}`}
            />           
           <p>Discription</p>
      </div>
    </div>
  );
};

export default MovieDetail;
