import { Component } from "react";
import { Modal } from "components/Modal/modal";

export class GalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" onClick={this.toggleModal} src={webformatURL} alt={tags} />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}