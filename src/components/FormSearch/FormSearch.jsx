import './FormSearch.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';

import { Label } from 'components/Label';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

export class FormSearch extends Component {

  state = {
    searchText: '',
  }

  static propTypes =  {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  handleChange = (event) => {
    const searchText = event.target.value;
    this.setState({
      searchText: searchText,
    });
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { searchText } = this.state;

    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(searchText);
      
      this.setState({
        searchText: '',
      });
    }
  }

  handleFocus = () => {
      // this.setState({
      //   searchText: '',
      // });
    console.log("Focus!");
    
  }

  render() {
    const { searchText } = this.state;
    const { className } = this.props;
    const classes = classNames('form', [className]);
    
    return (
      <div>
        <form className={classes} method="post" onSubmit={this.handleSubmit}>
          <Input type="text"
            id="input-search"
            name="search"
            value={searchText}
            placeholder="Sue"
            onChange={this.handleChange} 
          />
          <Button action="#"
            className="form-search__btn"
            type="submit"
            title={<SearchIcon fontSize='inherit' color="inherit" />}
            onClick={this.handleSubmit}            />
        </form>
      </div>
    );
  }
}
