import React, { Component } from 'react';

export class Button extends Component {
  
  render() {

    const { type, title, action, disabled, onClick } = this.props;

    return (
      <button 
        className="button" 
        type={type} 
        action ={action}
        onClick={onClick} 
        disabled={disabled}
      >
        {title}
      </button>
    );
  }
}