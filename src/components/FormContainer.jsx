import React, { Component, Fragment } from 'react';

import { Input } from 'components/Input';
import { Button } from 'components/Button';

export class FormContainer extends Component {

  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    idValid: false,
    firstNameValid: false,
    lastNameValid: false,
    emailValid: false,
    phoneValid: false,

    formValid: false,
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }

  validateField = (fieldName, value) => {

    let { idValid, firstNameValid, lastNameValid, emailValid, phoneValid } = this.state;

    // Валидация просто на заполненность
    switch(fieldName) {
      case 'id':
        idValid = Boolean(value);
        break;
      case 'firstName':
        firstNameValid = Boolean(value);
        break;
      case 'lastName':
        lastNameValid = Boolean(value);
        break;
      case 'email':
        emailValid = Boolean(value);
        break;
      case 'phone':
        phoneValid = Boolean(value);
        break;
    }
        
    this.setState({
      idValid : idValid,
      firstNameValid : firstNameValid,
      lastNameValid : lastNameValid,
      emailValid : emailValid,
      phoneValid : phoneValid
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState({ formValid: this.state.idValid && this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.phoneValid });
  }

  handleFormSubmit() {
    // Form submission logic
  }
  handleClearForm() {
    // Logic for resetting the form
  }

  render() {

    const { id, firstName, lastName, email, phone } = this.state;
    
    return (
      <Fragment>
        <form className="form" method="post">
          <Input 
            type={'text'}
            title={'id:'}
            id={'input-id'}
            name={'id'}
            value={this.state.id}
            placeholder={'101'}
            handleChange = {this.handleUserInput}
          />
          <Input 
            type={'text'}
            title={'first name:'}
            id={'input-firstName'}
            name={'firstName'}
            value={firstName}
            placeholder={'Sue'}
            handleChange = {this.handleUserInput}
          />
          <Input 
             type={'text'}
             title={'last name:'}
             id={'input-lastName'}
             name={'lastName'}
             value={lastName}
             placeholder={'Corson'}
             handleChange = {this.handleUserInput}
          />
          <Input 
             type={'text'}
             title={'email:'}
             id={'input-email'}
             name={'email'}
             value={email}
             placeholder={'dwhalley@in.gov'}
             handleChange = {this.handleUserInput}
          />
          <Input 
             type={'text'}
             title={'phone:'}
             id={'input-phone'}
             name={'phone'}
             value={phone}
             placeholder={'(612)211-6296'}
             handleChange = {this.handleUserInput}
          />

          <Button 
            action={'#'}
            type={'submit'}
            title={'Добавить в таблицу'}
            disabled={!this.state.formValid}
            onClick={this.handleFormSubmit}
            />
        </form>
      </Fragment>
    );
  }
}
