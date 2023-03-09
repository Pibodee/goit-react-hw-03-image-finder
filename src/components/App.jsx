import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/input';
import { Toaster } from 'react-hot-toast';
import { getImages } from 'services/fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/RejectedError/error';

export class App extends Component {
  state = {
    keyword: '',
    page: 1,
    images: null,
    error: '',
    status: 'idle',
    isLoading: false,
    moreImages: false
  };

  handleSubmit = keyword => {
    this.setState({ keyword });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      try {
        const data = await getImages(
          this.state.keyword.trim(),
          this.state.page
        );
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
        })

          const images = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          if (prevState.keyword !== this.state.keyword) {
            this.setState({ images: [...images], status: 'resolved' });
          } else {
            this.setState({
              images: [...prevState.images, ...images],
              status: 'resolved',
            });
          }
        const totalPages = Math.ceil(data.totalHits / 12);
        if (this.state.page === totalPages && this.state.page > 1) {
          toast.error('Sorry, you reached the end of results');
          this.setState({moreImages: false})
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
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
        />
        <Searchbar onSearch={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.status === 'resolved' && (
          <>
            <ImageGallery value={this.state.images} loadMore={this.handleLoadMore} moreImages={this.state.moreImages} />
            <ToastContainer autoClose={2000} />
          </>
        )}
        {this.state.status === 'rejected' && <Error />}
      </>
    );
  }
}
