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
    dataArray: [],
    sliceDataArray: [],

    pageNum: 1,
    pageCount: 50,
    pages: 1,
  }

  componentDidMount() {
    const { bigDataSet, pageNum, pageCount } = this.state;
    
    fetch(bigDataSet)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          dataArray: result,
          pages: Math.ceil(result.length / pageCount),
          sliceDataArray: result.slice((pageNum - 1) * pageCount, pageNum * pageCount),
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
      let dataArray = prevState.dataArray;
      
      dataArray.unshift(newData);
      return { dataArray };
    });
  }

  handleSorting = (fieldName, direction) => {
    let { dataArray } = this.state;

    if (fieldName === 'id' && direction === "asc") {
      dataArray.sort(function(a, b) {
        return a[fieldName] - b[fieldName];
      });
    } else if (fieldName === 'id' && direction === "desc") {
      dataArray.sort(function(a, b) {
        return b[fieldName] - a[fieldName];
      });
    } else if (fieldName !== 'id' && direction === "asc") {
      dataArray.sort(function(a, b) {
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
      dataArray.sort(function(a, b) {
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
      dataArray: dataArray,
    });
  }

  handleChangepageNum = (arrowBtn) => {

    this.setState(prevState => {
      let pageNum = prevState.pageNum;
      let sliceDataArray = prevState.sliceDataArray;
      let dataArray = prevState.dataArray;
      let pageCount = prevState.pageCount;
  
      if (arrowBtn === "nextPage") {
        pageNum = pageNum + 1;
      } else if (arrowBtn === "prevPage") {
        pageNum = pageNum - 1;
      }
      sliceDataArray = dataArray.slice((pageNum - 1) * pageCount, pageNum * pageCount);
          
      return { pageNum, sliceDataArray };
    });
  }

  render() {
    const {  error, isLoaded, showForm, pageNum, pageCount, pages, sliceDataArray } = this.state;

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
              <Table dataArray={sliceDataArray} onClick={this.handleSorting}/>
              {pages > 1 && (
                <Pagination 
                  pageNum={pageNum}
                  pages={pages}
                  pageCount={pageCount}
                  adjacents={1}
                  onClickArrow={this.handleChangepageNum} />
              )}
              </div>
          </Fragment>
        );
    }
  }
}