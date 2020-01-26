import React, { Component } from 'react';

export class Input extends Component {
  
  render() {

    const { id, name, type, value, title, placeholder, handleChange } = this.props;
    
    return (
      
      <div className="form-group">
        <label htmlFor={name} className="form-label">{title}</label>
        <input
          className="form-input"
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder} 
          onChange={handleChange}
        />
      </div>
    );
  }
}