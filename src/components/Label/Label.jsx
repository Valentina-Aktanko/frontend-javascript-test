import './Label.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Label extends Component {
  static propTypes =  {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { htmlFor, className, title } = this.props;
    const classes = classNames('form-label', [className]);
    
    return (
      <label htmlFor={htmlFor} className={classes}>
        {title}
      </label>
    );
  }
}