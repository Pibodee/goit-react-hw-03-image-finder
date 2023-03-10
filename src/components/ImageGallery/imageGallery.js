import { GalleryItem } from './imageGalleryItem';
import { Button } from 'components/Button/button';
import PropTypes from 'prop-types';

export const ImageGallery = ({ value, loadMore, moreImages }) => {
  return (
    <div className='ListWrap'>
    <ul className="ImageGallery">
      {value.map(image => {
        return <GalleryItem key={image.id} image={image} />;
      })}
    </ul>
      {moreImages &&<Button onClick={loadMore} />}
      </div>
  );
};


ImageGallery.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  )
}