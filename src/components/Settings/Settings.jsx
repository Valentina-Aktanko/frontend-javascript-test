import './Settings.scss';

import React, { Component } from 'react';

import { Input } from 'components/Input';
import { Label } from 'components/Label';
import { Button } from 'components/Button';

export class Settings extends Component {
  state = {
    smallDataSet: true,
    largeDataSet: false,
    // smallDataSet: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    // bigDataSet: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    
  }

  handleChange = (event) => {
    const value = event.target.value;

    this.setState({
      smallDataSet: value === 'small',
      largeDataSet: value === 'large',
    });

    // this.setState(prevState => {
    //   let smallDataSet = prevState.smallDataSet;
    //   let largeDataSet = prevState.largeDataSet;

    //   smallDataSet = value === 'small';
    //   largeDataSet = value === 'large';
    //   return { smallDataSet, largeDataSet };
    // });
  }

  handleSubmit = (event) => {
    const { smallDataSet } = this.state;
    // let checkedDataSet = smallDataSet ? 'small' : 'large';

    event.preventDefault();

    this.setState = {
      smallDataSet: true,
      largeDataSet: false,
    }
  }

  render() {
    const { smallDataSet, largeDataSet } = this.state;

    return (
      <div className="settings">
        <form className="settings__form" action="#" method="post">
          <p>Выберите набор данных:</p>
          <fieldset className="settings__fieldset">
            <Input type="radio"
              id="small"
              name="size"
              value="small"
              checked={smallDataSet}
              onChange={this.handleChange}
              checked={smallDataSet} />
            <Label htmlFor="small"
              title="Маленький" />
            <Input type="radio"
              id="large"
              name="size"
              value="large"
              checked={largeDataSet}
              onChange={this.handleChange}
              checked={largeDataSet} />
            <Label htmlFor="large"
              title="Большой" />
          </fieldset>
          <Button
            action="#"
            type="submit"
            title="Загрузить"
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}