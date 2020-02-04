import './FormAdd.scss';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Label } from 'components/Label';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

export class FormAdd extends Component {

  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    newData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
      
    validation: {
      idValid: false,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false,
    }
  }

  static propTypes =  {
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  handleChange = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      [fieldName]: value,
      newData: {
        ...prevState.newData,
        [fieldName]: value,
      },
    }), () => {this.validateField(fieldName, value)});
  }

  validateField = (fieldName, value) => {

    // Валидация не реализована, выполняется проверка на заполненность
    // switch сделан для возможности валидации разных полей
    switch(fieldName) {
      case 'id':
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            idValid: Boolean(value),
          }
        }), () => {this.validateForm()});
        break;
      case 'firstName':
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            firstNameValid: Boolean(value),
          }
        }), () => {this.validateForm()});
        break;
      case 'lastName':
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            lastNameValid: Boolean(value),
          }
        }), () => {this.validateForm()});
        break;
      case 'email':
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            emailValid: Boolean(value),
          }
        }));
        break;
      case 'phone':
        this.setState(prevState => ({
          validation: {
            ...prevState.validation,
            phoneValid: Boolean(value),
          }
        }), () => {this.validateForm()});
        break;
    }
  }

  validateForm = () => {
    const { validation } = this.state;
    let isValid = (validation.idValid && 
        validation.firstNameValid && 
        validation.lastNameValid && 
        validation.emailValid && 
        validation.phoneValid);
    
    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        formValid: isValid,
      }
    }));
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { newData } = this.state;

    event.preventDefault();

    if (typeof onSubmit === 'function') {
      onSubmit(Object.assign({}, newData));
      
      this.setState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        newData: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },

        validation: {
          idValid: false,
          firstNameValid: false,
          lastNameValid: false,
          emailValid: false,
          phoneValid: false,
          formValid: false,
        },
      });
    }
  }

  render() {
    const { formValid } = this.state.validation;
    const { id, firstName, lastName, email, phone } = this.state;
    const { className } = this.props;
    const classes = classNames('form', [className]);
    
    return (
      <Fragment>
        <form className={classes} method="post">
          <fieldset className="form-add__fieldset">
            <div className="form-add__group">
              <Label htmlFor="input-id"
                title="id:" />
              <Input type="text"
                id="input-id"
                name="id"
                value={id}
                placeholder="101"
                onChange={this.handleChange} />
            </div>
            <div className="form-add__group">
              <Label htmlFor="input-firstName"
                title="first name:" />
              <Input type="text"
                id="input-firstName"
                name="firstName"
                value={firstName}
                placeholder="Sue"
                onChange={this.handleChange} />
            </div>
            <div className="form-add__group">
              <Label htmlFor="input-lastName"
                title="last name:" />
              <Input type="text"
                id="input-lastName"
                name="lastName"
                value={lastName}
                placeholder="Corson"
                onChange={this.handleChange} />
            </div>
            <div className="form-add__group">
              <Label htmlFor="input-email"
                title="email:" />
              <Input type="text"
                id="input-email"
                name="email"
                value={email}
                placeholder="dwhalley@in.gov"
                onChange={this.handleChange}/>
            </div>
            <div className="form-add__group">
              <Label htmlFor="input-phone"
                title="phone:" />
              <Input  type="text"
                id="input-phone"
                name="phone"
                value={phone}
                placeholder="(612)211-6296"
                onChange={this.handleChange} />
            </div>
          </fieldset>

          <Button action="#"
            type="submit"
            title="Добавить в таблицу"
            disabled={!formValid}
            onClick={this.handleSubmit}/>
        </form>
      </Fragment>
    );
  }
}
