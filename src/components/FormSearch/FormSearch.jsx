import './FormSearch.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const { onSubmit } = this.props;
    const searchText = event.target.value;

    if (typeof onSubmit === 'function') {
      this.setState({
        searchText: searchText,
      }, () => onSubmit(searchText));
    }
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

  render() {
    const { searchText } = this.state;
    const { className } = this.props;
    const classes = classNames('form', [className]);
    
    return (
      <div>
        <form className={classes} method="post">
            <div className="form-search__group">
              <Label htmlFor="input-search"
                title="Что ищем?" />
              <Input type="text"
                id="input-search"
                name="search"
                value={searchText}
                placeholder="Sue"
                onChange={this.handleChange} 
              />
            </div>

          {/* <Button action="#"
            type="submit"
            title="Найти"
            onClick={this.handleSubmit}
          /> */}
        </form>
      </div>
    );
  }
}
