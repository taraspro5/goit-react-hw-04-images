import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ imageSmall, imageLarge, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img
        src={imageSmall}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={openModal}
      ></img>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={closeModal}
        largeImageURL={imageLarge}
        tags={tags}
      />
    </>
  );
};
