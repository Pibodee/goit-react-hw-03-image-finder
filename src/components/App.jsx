import { Component } from 'react';
import { Search } from './input/input';

export class App extends Component {
  state = {
    keyword: '',
  };

  handleSubmit = (keyword) => {
    this.setState({ keyword })
  }

  render() {
    return <Search onSearch={this.handleSubmit} />;
  }
}
