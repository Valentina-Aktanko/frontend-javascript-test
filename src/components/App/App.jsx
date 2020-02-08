import './App.scss';

import React, { Component, Fragment  } from 'react';

import { Loader } from 'components/Loader';
import { FormAdd } from 'components/FormAdd';
import { Table } from 'components/Table';
import { Button } from 'components/Button';
import { Pagination } from 'components/Pagination';

export class App extends Component {
  state = {
    smallDataSet: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    bigDataSet: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    
    address: '',

    error: null,
    isLoaded: false,
    
    showForm: false,
    userDataArray: [],

    currentPage: 18,
    totalItems: 0,
    limit: 50,
    pages: 1,
    start: 0,
    end: 0,
  }

  componentDidMount() {
    const { bigDataSet, currentPage, limit } = this.state;
    
    fetch(bigDataSet)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          userDataArray: result,
          totalItems: result.length,
          pages: Math.ceil(result.length / limit),
          start: (currentPage - 1) * limit,
          end: (currentPage * limit) - 1,
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

  handleSelectAddress = (selectedAddress) => {
    this.setState(prevState => {
      let address = prevState.address;
      address = selectedAddress;
      return { address };
    });
  }

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

  handleTogglePage = () => {
    console.log('Toggle page!');
  }

  render() {
    const {  error, isLoaded, showForm, userDataArray, currentPage, totalItems, limit, pages, start, end } = this.state;

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
              <Table userDataArray={userDataArray.slice(0, limit)} onClick={this.handleSorting}/>
              {pages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalItems={totalItems}
                  limit={limit}
                  onClick={this.handleTogglePage} />
              )}
              </div>
          </Fragment>
        );
    }
  }
}