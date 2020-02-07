import './Loader.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Button } from 'components/Button';

export class Loader extends Component {
  
  state = {
    smallDataSet: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    largeDataSet: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    
    error: null,
    isLoaded: false,

    DataArray: [],

    checkedSmall: true,
    checkedLarge: false
  }

  static propTypes =  {
    onSubmit: PropTypes.func,
  }
  
  handleChange = (event) => {
    const value = event.target.value;

    this.setState({
      checkedSmall: value === 'small',
      checkedLarge: value === 'large',
    });
  }

  handleSubmit = (event) => {
    const { smallDataSet, largeDataSet, error, isLoaded, checkedSmall, checkedLarge, DataArray } = this.state;
    const { onSubmit } = this.props;
    
    let address = checkedSmall ? smallDataSet : largeDataSet;

    event.preventDefault();

    if (typeof onSubmit === 'function') {
      onSubmit(address);
      this.setState = {
        checkedSmall: true,
        checkedLarge: false,
      }
    }
  }

  render() {
    const { checkedSmall, checkedLarge } = this.state;

    return (
      <div className="loader">
        <form className="loader__form" action="#" method="post">
          <p>Выберите набор данных:</p>
          <fieldset className="loader__fieldset">
            <Input type="radio"
              id="small"
              name="size"
              value="small"
              onChange={this.handleChange} 
              checked={checkedSmall} />
            <Label htmlFor="small"
              title="Маленький" />
            <Input type="radio"
              id="large"
              name="size"
              value="large"
              onChange={this.handleChange}
              checked={checkedLarge} />
            <Label htmlFor="large"
              title="Большой" />
          </fieldset>
          <Button 
            action="#"
            type="submit"
            title="Загрузить"
            onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }
}