import PropTypes from 'prop-types'

const MovieCardComponent = ({ movie, updateWatchlist }) => {
  const addToWatchlist = e => {
    const movieId = e.target.dataset.id
    updateWatchlist((prevWatchlist) => {
      return [...prevWatchlist, movieId];
    });
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
        <button
          className='absolute top-4 right-4 bg-white hover:bg-yellow-500 p-1'
          data-id={movie.id}
          onClick={addToWatchlist}
        >
          Add to watchlist
        </button>
      </div>
    </>
  )
}

MovieCardComponent.propTypes = {
  movie: PropTypes.object.isRequired,
  updateWatchlist: PropTypes.array.isRequired
}

export default MovieCardComponent
