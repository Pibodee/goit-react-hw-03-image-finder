import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/input';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    keyword: '',
    page: 1
  };

  handleSubmit = keyword => {
    this.setState({ keyword });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
     page: prevState.page +1,
    }))
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
        <Searchbar
          onSearch={this.handleSubmit}
        />
        <ImageGallery value={this.state.keyword} page={this.state.page} handleLoadMore={this.handleLoadMore} />
      </>
    );
  }
}
