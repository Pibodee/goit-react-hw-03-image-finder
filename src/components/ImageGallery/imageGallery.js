import { GalleryItem } from './imageGalleryItem';
import { Button } from 'components/Button/button';
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
