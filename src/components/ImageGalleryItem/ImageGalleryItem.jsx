import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, toggleModal, largeImageURL, alt}) => {
  return (
    <li className={css.ImageGalleryItem} onClick={()=>toggleModal(largeImageURL, alt)} >
      <img
        src={smallImg}
        alt={alt}
        className={css.imageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};