import PropTypes from 'prop-types'

const MovieCardComponent = ({
  movie,
  addToWatchlist,
  removeFromWatchlist,
  watchlist
}) => {

  const isAddedToWatchlist = movie => {
    return watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)
  }

  return (
    <>
      <div
        className='movie w-[250px] relative hover:scale-110 duration-300 p-2 border 	
border-gray-300'
      >
        <img
          className='backgroundMovieImg'
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        />
        <h2 className='absolute bottom-4 left-4 text-white hover:text-yellow-400 text-xl font-semibold pr-6'>
          {movie?.title}
        </h2>

        {isAddedToWatchlist(movie) ? (
          <button className="absolute right-4 top-4 text-white hover:text-yellow-400" onClick={() => removeFromWatchlist(movie)}>         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
              fill="red"
              className="hover:fill-red-700 hover:scale-110 duration-300 shadow-md"
            />
          </svg>
        </button>
        ) : (
            <button className="absolute right-4 top-4 text-white hover:text-yellow-400" onClick={() => addToWatchlist(movie)}>         
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                fill="#fff"
                className="hover:fill-red-500 hover:scale-110 duration-300 shadow-md"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}

MovieCardComponent.propTypes = {
    movie: PropTypes.object.isRequired,
    addToWatchlist: PropTypes.func.isRequired,
    removeFromWatchlist: PropTypes.func.isRequired,
    watchlist: PropTypes.array.isRequired,
};

export default MovieCardComponent
