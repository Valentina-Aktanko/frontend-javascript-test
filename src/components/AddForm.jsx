import React, { Component } from 'react';

export class AddForm extends Component {

  state = {
    isValid: true,
  }

  handleFormSend(event) {
    // const { isValid } = this.state;
    const isValid = true;

    if (isFilled) {
      console.log("Отправка формы");
    }
  }

  render() {

    return (
      <form className="add-form" method="post">
        <label htmlFor="add-form-id">id:</label>
        <input className="add-form__input" id="add-form-id" name="id" type="text" placeholder="101" />
        <label htmlFor="add-form-firstName">first name:</label>
        <input className="add-form__input" id="add-form-firstName" name="firstName" type="text" placeholder="Ivan" />
        <label htmlFor="add-form-lastName">last name:</label>
        <input className="add-form__input" id="add-form-lastName" name="lastName" type="text" placeholder="Ivanov" />
        <label htmlFor="add-form-email">email:</label>
        <input className="add-form__input" id="add-form-email" name="email" type="text" placeholder="mail@mail.ru" />
        <label htmlFor="add-form-phone">phone:</label>
        <input className="add-form__input" id="add-form-phone" name="phone" type="text" placeholder="(123)456-7890" />
        {/* <button class="button" action="#" type="submit" onClick={this.handleFormSend}>Добавить</button> */}
        <div className="button" onClick={this.handleFormSend}>Добавить в таблицу</div>
      </form>
    );
  }
}