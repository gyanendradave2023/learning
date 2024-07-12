
import PropTypes from 'prop-types'

const PaginationComponent = ({pageNo, handleNext, handlePrev}) => {
  const changePage = () => {
      
  }
  return (   
    <div className='bg-gray-400 flex justify-center mt-8 p-2  text-xl font-bold'>
        <div></div>
        <button onClick={handlePrev}>&lt;</button>
        <button data-id={pageNo} onClick={changePage}>{pageNo}</button>
      
        {/* <span className='px-4'>{pageNo}</span> */}
        <button onClick={handleNext}>&gt;</button>
    </div>
  )
}

PaginationComponent.propTypes = {
    pageNo: PropTypes.number.isRequired,
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
}

export default PaginationComponent