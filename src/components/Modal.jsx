import PropTypes from 'prop-types';
import css from './styles/Modal.module.css'
const Modal = ({ src, alt, visibility, onClick }) => {
    return (
        <div className={`${css.Overlay} addition ${visibility}`} onClick={onClick}>
            <div className={css.Modal}>
                <img src={src} alt={alt} />
            </div>
        </div>)
};
Modal.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    visibility: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
export { Modal };