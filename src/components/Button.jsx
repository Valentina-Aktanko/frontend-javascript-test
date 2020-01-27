import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class Button extends Component {
  static propTypes =  {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }

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