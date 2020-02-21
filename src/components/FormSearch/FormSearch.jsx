import './FormSearch.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchIcon from '@material-ui/icons/Search';

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
    const { onSubmit } = this.props;

    this.setState({
      searchText: searchText,
    });

    // Если поле поиска пустое, отменим фильтрацию
    if (searchText === '' && typeof onSubmit === 'function') {
      onSubmit(searchText);
    }
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { searchText } = this.state;

    event.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(searchText);
      
      // Выделим текст в поле поиска
      document.getElementById('input-search').select();
    }
  }

  render() {
    const { searchText } = this.state;
    const { className } = this.props;
    const classes = classNames('form', [className]);
    
    return (
      <div>
        <form className={classes} method="post" onSubmit={this.handleSubmit}>
          <SearchIcon fontSize="inherit" color="inherit" />
          <Input type="search"
            className="form-search__input"
            id="input-search"
            name="search"
            value={searchText}
            placeholder="Sue"
            onChange={this.handleChange} 
          />
          <Button action="#"
            className="form-search__btn"
            type="submit"
            title="Найти"
            onClick={this.handleSubmit}            />
        </form>
      </div>
    );
  }
}
