
import PropTypes from 'prop-types'

const Button =  ({ children, className, ...rest }) => {
  return (
    <button
    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
    {...rest}
  >
    {children}
  </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Button