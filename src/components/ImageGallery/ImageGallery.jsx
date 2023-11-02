import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesItems }) => {
  return (
    <ul className="ImageGallery">
      {imagesItems.map(item => (
        <li key={item.id} className="ImageGalleryItem ImageGalleryItem-image">
          <ImageGalleryItem
            imageSmall={item.webformatURL}
            imageLarge={item.largeImageURL}
            tags={item.tags}
          />
        </li>
      ))}
    </ul>
  );
};
