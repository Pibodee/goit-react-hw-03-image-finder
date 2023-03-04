import { getImages } from 'components/Fetch/fetch';
import { Component } from 'react';
import { GalleryItem } from './imageGalleryItem';
import { ThreeDots } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ loading: true });
        getImages(this.props.value)
            .then(response => response.json())
            .then((images) => this.setState({ images}))
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
  render() {
    return (
      <>
        {this.state.loading && (
          <div className="wrapper">
            <ThreeDots color="#3f51b5" wrapperClassName="ImageGalleryItem" />
          </div>
        )}
        {this.state.images && (
          <ul className="ImageGallery">
            {this.state.images.hits.map(({ id, webformatURL, tags }) => {
              return (
                <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
