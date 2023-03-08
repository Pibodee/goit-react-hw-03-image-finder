import { getImages } from 'services/fetch';
import { Component } from 'react';
import { GalleryItem } from './imageGalleryItem';
import { Error } from 'components/RejectedError/error';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/button';

export class ImageGallery extends Component {
  state = {
    images: null,
    error: '',
    status: 'idle',
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.value !== this.props.value ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await getImages(this.props.value.trim(), this.props.page);

        if (data.hits.length === 0) {
          toast.error('No matches found!');
          this.setState({
            images: null,
            status: 'idle',
          });
          return;
        } else {
          const images = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          if (prevProps.value !== this.props.value) {
            this.setState({ images: [...images], status: 'resolved' });
          } else {
            this.setState({
              images: [...prevState.images, ...images],
              status: 'resolved',
            });
          }
        }
      } catch (error) {
        console.log(this.state.images);
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    const { status, images, isLoading } = this.state;
    const { handleLoadMore } = this.props;
    return (
      <>
        {isLoading && <Loader />}
        {status === 'resolved' && (
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags }) => {
              return (
                <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
              );
            })}
            <Button onClick={handleLoadMore} />
            <ToastContainer autoClose={2000} />
          </ul>
        )}
        {status === 'rejected' && <Error />}
      </>
    );

    // if (status === 'pending') {
    //   return <Loader />;
    // }
    // if (status === 'resolved') {
    //   return (
    //     <ul className="ImageGallery">
    //       {images.map(({ id, webformatURL, tags }) => {
    //         return (
    //           <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
    //         );
    //       })}
    //       <Button onClick={handleLoadMore}/>
    //       <ToastContainer autoClose={2000} />
    //     </ul>
    //   );
    // }
    // if (status === 'rejected') {
    //   return <Error />;
    // }
  }
}
