
import PropTypes from 'prop-types'

const Input = ({className, ...rest}) => {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      {...rest}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
}

export default Input