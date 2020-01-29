import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components/Input';
import { Button } from 'components/Button';

export class Form extends Component {

  state = {
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
    onSubmit: PropTypes.func,
  }

  handleChange = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState(prevState => {
      let newData = Object.assign({}, prevState.newData);
      newData[fieldName] = value;
      return { newData };
    },
    () => {this.validateField(fieldName, value)});
  }

  validateField = (fieldName, value) => {

    // Валидация только на заполненность
    switch(fieldName) {
      case 'id':
        this.setState({
          validation: {
            ...this.state.validation,
            idValid: Boolean(value),
          }
        });
        break;
      case 'firstName':
        this.setState({
          validation: {
            ...this.state.validation,
            firstNameValid: Boolean(value),
          }
        });
        break;
      case 'lastName':
        this.setState({
          validation: {
            ...this.state.validation,
            lastNameValid: Boolean(value),
          }
        });
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
        }));
        break;
    }

    this.validateForm();
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
    const { newData } = this.state;
    
    return (
      <Fragment>
        <form className="form" method="post">
          <Input 
            type="text"
            title="id:"
            id="input-id"
            name="id"
            value={this.state.id}
            placeholder="101"
            onChange={this.handleChange}
          />
          <Input 
            type="text"
            title="first name:"
            id="input-firstName"
            name="firstName"
            value={this.state.firstName}
            placeholder="Sue"
            onChange={this.handleChange}
          />
          <Input 
             type="text"
             title="last name:"
             id="input-lastName"
             name="lastName"
             value={this.state.lastName}
             placeholder="Corson"
             onChange={this.handleChange}
          />
          <Input 
             type="text"
             title="email:"
             id="input-email"
             name="email"
             value={this.state.email}
             placeholder="dwhalley@in.gov"
             onChange={this.handleChange}
          />
          <Input 
             type="text"
             title="phone:"
             id="input-phone"
             name="phone"
             value={this.state.phone}
             placeholder="(612)211-6296"
             onChange={this.handleChange}
          />
          <Button 
            action="#"
            type="submit"
            title="Добавить в таблицу"
            disabled={!formValid}
            onClick={this.handleSubmit}
            />
        </form>
      </Fragment>
    );
  }
}
