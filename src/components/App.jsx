import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Input';
import { Toaster } from 'react-hot-toast';
import { getImages } from 'services/fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/RejectedError/Error';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    keyword: '',
    page: 1,
    images: null,
    error: '',
    status: 'idle',
    isLoading: false,
    moreImages: false,
  };

  handleSubmit = keyword => {
    this.setState({ keyword, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const { keyword, page } = this.state;
    if (prevState.keyword !== keyword || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const data = await getImages(keyword.trim(), page);
        if (data.hits.length === 0) {
          toast.error('No matches found!');
          this.setState({
            images: null,
            status: 'idle',
          });
          return;
        }

        this.setState({
          moreImages: data.hits.length === 12,
        });

        const images = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        if (prevState.keyword !== keyword) {
          this.setState({isLoading: true, status: 'idle'})
          this.setState({ images: [...images], status: 'resolved', page: 1 });
        } else {
          this.setState({
            images: [...prevState.images, ...images],
            status: 'resolved',
          });
        }
        const totalPages = Math.ceil(data.totalHits / 12);
        if (page === totalPages && page > 1) {
          toast.done('Sorry, you reached the end of results');
          this.setState({ moreImages: false });
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { isLoading, status, images, moreImages } = this.state;
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Searchbar onSearch={this.handleSubmit} />
        {isLoading && <Loader />}
        {status === 'resolved' && (
          <div className="ListWrap">
            <ImageGallery
              value={images}
            />
            {moreImages && <Button onClick={this.handleLoadMore} />}
            <ToastContainer autoClose={2000} />
          </div>
        )}
        {status === 'rejected' && <Error />}
      </>
    );
  }
}
