import PropTypes from 'prop-types';
const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Load more
    </button>
  );
};
export { Button };
