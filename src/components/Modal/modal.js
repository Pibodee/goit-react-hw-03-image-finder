import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

    render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className='Overlay' onClick={this.handleBackdropClick}>
        <img className='Modal' src={largeImageURL} alt={tags} />
      </div>,
      modalRoot
    );
  }
}