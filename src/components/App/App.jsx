import './App.scss';

import React, { Component, Fragment  } from 'react';

import { Intro } from 'components/Intro';
import { FormAdd } from 'components/FormAdd';
import { Table } from 'components/Table';
import { Button } from 'components/Button';

export class App extends Component {
  state = {
    smallDataSet: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    largeDataSet: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    
    address: null,

    error: null,
    isLoaded: false,
    
    showForm: false,
    userDataArray: [],
  }

  componentDidMount() {
    const { smallDataSet } = this.state;
    
    fetch(smallDataSet)
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

  // handleSelectSize = (isSmall, isLarge) => {
  //   this.setState(prevState => {
  //     let address = prevState.address;
  //     address = isSmall ? prevState.smallDataSet : prevState.largeDataSet;
  //     console.log(address);
  //     return { address };
  //   });
  // }

  handleAddData = (newData) => {

    this.setState(prevState => {
      let userDataArray = prevState.userDataArray;
      
      userDataArray.unshift(newData);
      return { userDataArray };
    });
  }

  handleSorting = (fieldName, direction) => {
    let { userDataArray } = this.state;

    if (fieldName === 'id' && direction === "asc") {
      userDataArray.sort(function(a, b) {
        return a[fieldName] - b[fieldName];
      });
    } else if (fieldName === 'id' && direction === "desc") {
      userDataArray.sort(function(a, b) {
        return b[fieldName] - a[fieldName];
      });
    } else if (fieldName !== 'id' && direction === "asc") {
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
    } else if (fieldName !== 'id' && direction === "desc") {
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
    const {  address, addressMax, error, isLoaded, showForm, userDataArray} = this.state;
    
      // <Intro onSubmit={this.handleSelectSize} />
    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="async-spinner"></div>
    } else {
      return (
        <Fragment>
          <div className="container">
            <Button 
              className="button"
              type="button"
              title="Добавить"
              onClick={this.handleClick}
            />
            {showForm && (
              <FormAdd className="form-add" onSubmit={this.handleAddData}/>
            )}
            <Table userDataArray={userDataArray} onClick={this.handleSorting}/>
          </div>
        </Fragment>
      );
    }
  }
}