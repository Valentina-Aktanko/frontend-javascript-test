import React, { Component, Fragment  } from 'react';

import { Form } from 'components/Form';
import { Table } from 'components/Table';
import { Button } from 'components/Button';

export class App extends Component {

  state = {
    address: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",

    error: null,
    isLoaded: false,
    userDataArray: [],

    showForm: false,

    newUser: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validation: {
      id: false,
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      form: false,
    },

    sortBy: {
      field: null,
      direction: null
    },

  }

  componentDidMount() {

    const { address } = this.state;
    
    fetch(address)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          userDataArray: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    )
  }

  handleToggleShowForm = () => {
    this.setState({
      showForm : !this.state.showForm,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      let userDataArray = prevState.userDataArray;
      let newUser = Object.assign({}, prevState.newUser);
      userDataArray.unshift(newUser);
      return { userDataArray };
    });
    console.log(this.state);
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => {
      let newUser = Object.assign({}, prevState.newUser);
      newUser[name] = value;
      return { newUser };
    },
      () => { this.validateField(name, value) 
    });
  }

  validateField = (fieldName, value) => {
    let { validation } = this.state;
    let isValid = false;

    // Валидация просто на заполненность
    switch(fieldName) {
      case 'id':
        // TODO валидация поля id
        isValid = Boolean(value);
        break;
      case 'firstName':
        // TODO валидация поля firstName
        isValid = Boolean(value);
        break;
      case 'lastName':
        // TODO валидация поля lastName
        isValid = Boolean(value);
        break;
      case 'email':
        // TODO валидация поля email
        isValid = Boolean(value);
        break;
      case 'phone':
        // TODO валидация поля phone
        isValid = Boolean(value);
        break;
    }
        
    this.setState(prevState => {
      let validation = Object.assign({}, prevState.validation);
      validation[fieldName] = isValid;
      return { validation };
    }, this.validateForm);
  }

  validateForm = () => {
    this.setState(prevState => {
      let validation = Object.assign({}, prevState.validation);
      let isValid = (prevState.validation.id && 
        prevState.validation.firstName && 
        prevState.validation.lastName && 
        prevState.validation.email && 
        prevState.validation.phone);
      validation.form = isValid;
      return { validation };
    });
  }

  render() {

    const { error, isLoaded, userDataArray } = this.state;
    const { newUser, showForm, validation } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <Fragment>
          <div className="container">
            <Button 
              type={'button'}
              title={'Добавить'}
              onClick={this.handleToggleShowForm}
            />
            {showForm && (
              <Form 
                newUser = { newUser } 
                handleSubmit = { this.handleSubmit }
                onChange = { this.handleChange }
                formValid = { validation.form }
              />
            )}
            <Table userDataArray = { userDataArray } />
          </div>
        </Fragment>
      );
    }
  }
}