import ModalWindow from 'react-modal';
ModalWindow.setAppElement('#root');

export const Modal = ({ isModalOpen, onCloseModal, largeImageURL, tags }) => {
  return (
    <ModalWindow
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      contentLabel="Example Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <img src={largeImageURL} alt={tags}></img>
    </ModalWindow>
  );
};
