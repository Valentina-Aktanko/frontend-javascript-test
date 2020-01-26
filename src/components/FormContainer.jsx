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
            value={id}
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

          {/* <label htmlFor="input-id">id:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="input-id" name="input-id" type="text" placeholder="101" value={this.state.id} />
          <label htmlFor="add-form-firstName">first name:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-firstName" name="firstName" type="text" placeholder="Ivan" value={this.state.firstName} />
          <label htmlFor="add-form-lastName">last name:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-lastName" name="lastName" type="text" placeholder="Ivanov" value={this.state.lastName} />
          <label htmlFor="add-form-email">email:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-email" name="email" type="text" placeholder="mail@mail.ru" value={this.state.email} />
          <label htmlFor="add-form-phone">phone:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-phone" name="phone" type="text" placeholder="(123)456-7890" value={this.state.phone} /> */}
          
          {/* <button className="button" action="#" type="submit" onClick={this.handleFormSubmit} disabled={!this.state.formValid}>Добавить в таблицу</button> */}
          
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
