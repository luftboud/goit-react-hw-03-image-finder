import PropTypes from 'prop-types';
import {ImageGalleryItem} from './ImageGalleryItem'
const ImageGallery = ({ hits }) => {
  return (
    <ul className="ImageGallery">
      {hits.map(h => (
        <ImageGalleryItem src={h.webformatURL} alt={h.tags} key={h.id} />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
};
export { ImageGallery };