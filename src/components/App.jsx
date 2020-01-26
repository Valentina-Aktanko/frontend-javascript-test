import React, { Component, Fragment  } from 'react';

import { AddForm } from 'components/AddForm';
import { Table } from 'components/Table';

export class App extends Component {

  state = {
    address: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",

    error: null,
    isLoaded: false,
    userDataArray: [],

    showForm: false,

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

  render() {

    const { error, isLoaded, userDataArray } = this.state;
    const { showForm } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <Fragment>
          <button onClick={this.handleToggleShowForm}>Добавить</button>
          {showForm && <AddForm />}
          <Table userDataArray = { userDataArray } />
        </Fragment>
      );
    }
  }
}