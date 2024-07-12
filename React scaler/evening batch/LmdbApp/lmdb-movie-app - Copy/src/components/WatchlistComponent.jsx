import { useEffect, useState } from 'react'

function WatchlistComponent () {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const watchlist = localStorage.getItem('watchlist')
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist))
    }
  }, [])

  return (
    <div className='relative overflow-x-auto shadow-md m-5 sm:rounded-lg border border-gray-300'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-16 py-3 w-32'>
              <span className='sr-only'>Movie Banner</span>
            </th>
            <th scope='col' className='px-6 py-3'>
              Movie Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Ratings
            </th>
            <th scope='col' className='px-6 py-3'>
              Popularity
            </th>
            <th scope='col' className='px-6 py-3'>
              Genere
            </th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map(movie => {
            return (
              <tr
                key={movie.id}
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td className='p-4 w-32'>
                  <img
                    className='w-16 md:w-32 max-w-full max-h-full'
                    src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                    alt={movie.title}
                  />
                </td>
                <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                  {movie.title}
                </td>
                <td className='px-6 py-4'>{movie.vote_average}</td>
                <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                  {movie.popularity}
                </td>
                <td className='px-6 py-4'>{movie.genre_ids}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WatchlistComponent
