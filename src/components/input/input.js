import { Component } from 'react';

export class Search extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSearch(this.state.value);

    }


  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}
