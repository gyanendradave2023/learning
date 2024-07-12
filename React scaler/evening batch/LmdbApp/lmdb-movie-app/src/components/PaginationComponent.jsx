import PropTypes from 'prop-types'
import { useEffect, useState, useCallback } from 'react'

const PaginationComponent = ({ onPageChange }) => {
  const totalPages = 25;
  const maxVisiblePageCount = 10;
  const [pages, setPages] = useState([])
  const [activePage, setActivePage] = useState(1)

  const getPages = useCallback((totalPages, maxVisiblePageCount, activePage) => {
    const maxResultSize =
      totalPages > maxVisiblePageCount ? maxVisiblePageCount : totalPages
    const startingPage =
      activePage + maxResultSize > totalPages
        ? totalPages - maxResultSize + 1
        : activePage
    return [...Array(maxResultSize)].map((_, idx) => {
      return startingPage + idx
    })
  }, []);

  useEffect(() => {
    const newPages = getPages(totalPages, maxVisiblePageCount, activePage)
    setPages(newPages)
  }, [activePage])

  const changePage = useCallback((e) => {
    let selectedPageNo = 0
    if (e.target.dataset.id === 'PREVIOUS') {
      selectedPageNo = activePage - 1
    } else if (e.target.dataset.id === 'NEXT') {
      selectedPageNo = activePage + 1
    } else {
      selectedPageNo = Number(e.target.dataset.id)
    }
    setActivePage(selectedPageNo)
    onPageChange(selectedPageNo)
  }, [activePage]);

  return (
    <div className='bg-gray-100 flex justify-center mt-8 p-2  text-xl font-medium'>
      <button
        disabled={activePage === 1}
        className='p-2 mr-4 text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed'
        data-id={'PREVIOUS'}
        onClick={changePage}
      >
        PREVIOUS
      </button>
      {pages.map(page => (
        <button
          key={page}
          className={`p-2 w-10 hover:text-blue-700 ${
            activePage == page ? 'text-blue-600 font-bold' : ''
          }`}
          data-id={page}
          onClick={changePage}
        >
          {page}
        </button>
      ))}
      <button
        disabled={activePage === totalPages}
        className='p-2 ml-4 text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed'
        data-id={'NEXT'}
        onClick={changePage}
      >
        NEXT
      </button>
    </div>
  )
}

PaginationComponent.propTypes = {
  onPageChange: PropTypes.func.isRequired
}

export default PaginationComponent
