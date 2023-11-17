import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem'
import css from './styles/ImageGallery.module.css'
const ImageGallery = ({ hits, onClick }) => {
  return (
    <ul className={css.ImageGallery} onClick={onClick}>
      {hits.map(h => (
        <ImageGalleryItem src={h.webformatURL} alt={h.tags} key={h.id}  />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export { ImageGallery };