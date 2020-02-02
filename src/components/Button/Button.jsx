import './Button.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Button extends Component {
  static propTypes =  {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    action: PropTypes.string,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  }
  
  render() {
    const { type, className, id, action, title, disabled, onClick } = this.props;
    const classes = classNames('button', [className]);

    return (
      <button type={type} 
        className={classes}
        action ={action}
        onClick={onClick} 
        disabled={disabled}>
        {title}
      </button>
    );
  }
}