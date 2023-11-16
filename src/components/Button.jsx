import PropTypes from 'prop-types';
const Button = ({ onClick, display }) => {
  return (
    <button type="button" onClick={onClick} className={display}>
      Load more
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export { Button };
