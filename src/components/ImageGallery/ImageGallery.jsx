import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ items, toggleModal}) => {
  return (
    <ul className={css.imageGallery}>
      {items.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            smallImg={webformatURL}
            toggleModal={toggleModal}
            largeImageURL={largeImageURL}
            alt={tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
  })).isRequired,
  toggleModal: PropTypes.func.isRequired
}