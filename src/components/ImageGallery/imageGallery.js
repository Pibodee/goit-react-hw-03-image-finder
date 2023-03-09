import { GalleryItem } from './imageGalleryItem';
import { Button } from 'components/Button/button';
export const ImageGallery = ({ value, loadMore, moreImages }) => {
  return (
    <div className='ListWrap'>
    <ul className="ImageGallery">
      {value.map(({ id, webformatURL, tags }) => {
        return <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />;
      })}
    </ul>
      {moreImages &&<Button onClick={loadMore} />}
      </div>
  );
};
