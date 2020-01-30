import React, { Component, Fragment  } from 'react';

import { Form } from 'components/Form';
import { Table } from 'components/Table';
import { Button } from 'components/Button';

export class App extends Component {
  state = {
    address: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    addressMax: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    
    error: null,
    isLoaded: false,
    
    showForm: false,
    userDataArray: [],
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

  handleClick = () => {
    this.setState({
      showForm : !this.state.showForm,
    });
  }

  handleSubmit = (newData) => {

    this.setState(prevState => {
      let userDataArray = prevState.userDataArray;
      
      userDataArray.unshift(newData);
      return { userDataArray };
    });
  }

  handleSorting = (fieldName, direction) => {
    let { userDataArray } = this.state;

    if (fieldName === 'id' && direction === "desc") {
      userDataArray.sort(function(a, b) {
        return a[fieldName] - b[fieldName];
      });
    } else if (fieldName === 'id' && direction === "asc") {
      userDataArray.sort(function(a, b) {
        return b[fieldName] - a[fieldName];
      });
    } else if (fieldName !== 'id' && direction === "desc") {
      userDataArray.sort(function(a, b) {
        let nameA = a[fieldName].toLowerCase();
        let nameB = b[fieldName].toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0 ;
        }
      });
    } else if (fieldName !== 'id' && direction === "asc") {
      userDataArray.sort(function(a, b) {
        let nameA = a[fieldName].toLowerCase();
        let nameB = b[fieldName].toLowerCase();
        if (nameB < nameA) {
          return -1;
        } else if (nameB > nameA) {
          return 1;
        } else {
          return 0 ;
        }
      });
    } else console.log("Ошибка сортировки");

    this.setState({
      userDataArray: userDataArray,
    });
  }

  render() {
    const { error, isLoaded, showForm, userDataArray} = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <Fragment>
          <div className="container">
            <Button 
              type="button"
              title="Добавить"
              onClick={this.handleClick}
            />
            {showForm && (
              <Form onSubmit={this.handleSubmit}/>
            )}
            <Table userDataArray={userDataArray} onClick={this.handleSorting}/>
          </div>
        </Fragment>
      );
    }
  }
}