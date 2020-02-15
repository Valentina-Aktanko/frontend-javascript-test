import './Input.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  static propTypes =  {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const { id, name, type, value, title, placeholder, onChange } = this.props;
    
    return (
      <div className="form-group">
        <label
          htmlFor={id}
          className="form-label"
        >
          {title}
        </label>
        <input
          className="form-input"
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder} 
          onChange={onChange}
        />
      </div>
    );
  }
}