import './Input.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Input extends Component {
  static propTypes =  {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
  }

  render() {
    const { type, className, id, name, value, placeholder, onChange, checked } = this.props;
    const classes = classNames('form-input', [className]);

    return (
      <input 
        type={type}
        className={classes}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        checked={checked} />
    );
  }
}