import { Component } from 'react';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Searchbar } from './Searchbar/input';
import { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    keyword: '',
  };

  handleSubmit = keyword => {
    this.setState({ keyword });
  };

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
        <ImageGallery value={this.state.keyword} />
      </>
    );
  }
}
