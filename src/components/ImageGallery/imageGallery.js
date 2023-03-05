import { getImages } from 'components/Fetch/fetch';
import { Component } from 'react';
import { GalleryItem } from './imageGalleryItem';
import { Error } from 'components/RejectedError/error';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: null,
    error: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ status: 'pending' });
      getImages(this.props.value)
        .then(images => {
          if (images.hits.length === 0) {
            toast.error('No matches found!');
            this.setState({
              images: null,
              status: 'idle',
            });
            return;
          } else {
            this.setState({ images: images.hits, status: 'resolved' });
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }
  render() {
    const { status, images } = this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, tags }) => {
            return (
              <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
            );
          })}
          <ToastContainer autoClose={2000} />
        </ul>
      );
    }
    if (status === 'rejected') {
      return <Error />;
    }
  }
}
