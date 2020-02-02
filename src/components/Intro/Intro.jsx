import './Intro.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Button } from 'components/Button';

export class Intro extends Component {
  
  state = {
    checkedSmall: true,
    checkedLarge: false
  }

  static propTypes =  {
    onSubmit: PropTypes.func,
  }
  
  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { checkedSmall, checkedLarge } = this.state;

    event.preventDefault();

    if (typeof onSubmit === 'function') {
      onSubmit(checkedSmall, checkedLarge);
      this.setState = {
        checkedSmall: true,
        checkedLarge: false
      }
    }
  }

  handleChange = (event) => {
    const value = event.target.value;

    this.setState({
      isSmall: value==='small',
      checkedLarge: value==='large',
    });
  }

  render() {
    const { checkedSmall, checkedLarge } = this.state;

    return (
      <div className="intro">
        <form className="intro__form" action="#" method="post">
          <p>Выберите набор данных:</p>
          <fieldset className="intro__fieldset">
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