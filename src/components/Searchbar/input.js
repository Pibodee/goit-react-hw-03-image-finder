import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearchAlt2 } from 'react-icons/bi';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.value) {
      return toast.error('Please, enter some keywords');
    }

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            className="SearchForm-button SearchForm-button-label"
            type="submit"
          >
            <span>
              <BiSearchAlt2 className="SearchForm-button-label" />
            </span>
          </button>
        </form>
      </div>
    )
  }
}
