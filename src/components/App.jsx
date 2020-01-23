import React, { Component } from 'react';

import { AddForm } from 'components/AddForm';
import { Table } from 'components/Table';

export class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    userDataArray: [],
  }

  componentDidMount() {
    fetch("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
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

  render() {

    const { error, isLoaded, userDataArray } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <AddForm />
        // <Table userDataArray = { userDataArray } />
      );
    }
  }
}