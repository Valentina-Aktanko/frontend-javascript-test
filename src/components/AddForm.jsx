import React, { Component, Fragment } from 'react';

export class AddForm extends Component {

  state = {
    id: "",
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

  handleShowForm(event) {
    let form = document.getElementById('add-data-form');
    form.classList.toggle("visually-hidden");
  }

  handleUserInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let { idValid, firstNameValid, lastNameValid, emailValid, phoneValid } = this.state;

    // Валидация просто на заполненность
    switch(fieldName) {
      case 'id':
        idValid = Boolean(value);
        break;
      case 'firstName':
        firstNameValid = value !== '';
        break;
      case 'lastName':
        lastNameValid = value !== '';
        break;
      case 'email':
        emailValid = value !== '';
        break;
      case 'phone':
        phoneValid = value !== '';
        break;
    }
        
    this.setState({
      idValid : idValid,
      firstNameValid : firstNameValid,
      lastNameValid : lastNameValid,
      emailValid : emailValid,
      phoneValid : phoneValid
    }, this.validateForm);

    console.log(this.state);
  }

  validateForm() {
    this.setState({ formValid: this.state.idValid && this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.phoneValid });
  }

  handleShowForm(event) {
    event.preventDefault();
  }

  render() {

    return (
      <Fragment>
        <button onClick={this.handleShowForm}>Добавить</button>
        <form className="add-form" id="add-data-form" method="post">
          <label htmlFor="add-form-id">id:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-id" name="id" type="text" placeholder="101" value={this.state.id} />
          <label htmlFor="add-form-firstName">first name:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-firstName" name="firstName" type="text" placeholder="Ivan" value={this.state.firstName} />
          <label htmlFor="add-form-lastName">last name:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-lastName" name="lastName" type="text" placeholder="Ivanov" value={this.state.lastName} />
          <label htmlFor="add-form-email">email:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-email" name="email" type="text" placeholder="mail@mail.ru" value={this.state.email} />
          <label htmlFor="add-form-phone">phone:</label>
          <input className="add-form__input" onChange={this.handleUserInput} id="add-form-phone" name="phone" type="text" placeholder="(123)456-7890" value={this.state.phone} />
          <button className="button" action="#" type="submit" onClick={this.handleFormSend} disabled={!this.state.formValid}>Добавить в таблицу</button>
        </form>
      </Fragment>
    );
  }
}
