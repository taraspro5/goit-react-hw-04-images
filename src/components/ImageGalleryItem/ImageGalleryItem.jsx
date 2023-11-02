import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { imageSmall, imageLarge, tags } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <img
          src={imageSmall}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={this.openModal}
        ></img>
        <Modal
          isModalOpen={isModalOpen}
          onCloseModal={this.closeModal}
          largeImageURL={imageLarge}
          tags={tags}
        />
      </>
    );
  }
}
