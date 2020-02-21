import './App.scss';

import React, { Component } from 'react';

import { Loader } from 'components/Loader';
import { FormAdd } from 'components/FormAdd';
import { FormSearch } from 'components/FormSearch';
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

    showAddForm: false,
    dataArray: [],
    sliceDataArray: [],

    pageNum: 1,
    pageCount: 50,
    pages: 1,
  }

  componentDidMount() {
    const { smallDataSet, pageNum, pageCount } = this.state;

    fetch(smallDataSet)
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

  handleShowAddForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm,
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
      let sliceDataArray = prevState.sliceDataArray;

      dataArray.unshift(newData);
      sliceDataArray.unshift(newData);
      return { dataArray, sliceDataArray };
    });
  }

  handleSearchData = (searchText) => {

    this.setState(prevState => {
      let pageNum = prevState.pageNum;
      let sliceDataArray = prevState.sliceDataArray;
      let dataArray = prevState.dataArray;
      let pageCount = prevState.pageCount;

      if (searchText === '') {
        sliceDataArray = dataArray.slice((pageNum - 1) * pageCount, pageNum * pageCount);
      } else {
        sliceDataArray = sliceDataArray.filter(item =>
          String(item.id).includes(searchText) ||
          item.firstName.includes(searchText) ||
          item.lastName.includes(searchText) ||
          item.email.includes(searchText) ||
          item.phone.includes(searchText));
      }
      return { sliceDataArray };
    });
  }

  handleSorting = (fieldName, direction) => {
    let { sliceDataArray } = this.state;

    if (fieldName === 'id' && direction === "asc") {
      sliceDataArray.sort(function (a, b) {
        return a[fieldName] - b[fieldName];
      });
    } else if (fieldName === 'id' && direction === "desc") {
      sliceDataArray.sort(function (a, b) {
        return b[fieldName] - a[fieldName];
      });
    } else if (fieldName !== 'id' && direction === "asc") {
      sliceDataArray.sort(function (a, b) {
        let nameA = a[fieldName].toLowerCase();
        let nameB = b[fieldName].toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (fieldName !== 'id' && direction === "desc") {
      sliceDataArray.sort(function (a, b) {
        let nameA = a[fieldName].toLowerCase();
        let nameB = b[fieldName].toLowerCase();
        if (nameB < nameA) {
          return -1;
        } else if (nameB > nameA) {
          return 1;
        } else {
          return 0;
        }
      });
    } else console.log("Ошибка сортировки");

    this.setState({
      sliceDataArray: sliceDataArray,
    });
  }

  handleChangePageNum = (btnContent) => {

    this.setState(prevState => {
      let pageNum = prevState.pageNum;
      let sliceDataArray = prevState.sliceDataArray;
      let dataArray = prevState.dataArray;
      let pageCount = prevState.pageCount;

      if (btnContent === "nextPage") {
        pageNum = pageNum + 1;
      } else if (btnContent === "prevPage") {
        pageNum = pageNum - 1;
      } else if (typeof btnContent === "number" && !isNaN(btnContent)) {
        pageNum = btnContent;
      } else pageNum = pageNum;

      sliceDataArray = dataArray.slice((pageNum - 1) * pageCount, pageNum * pageCount);

      return { pageNum, sliceDataArray };
    });
  }

  render() {
    const { error, isLoaded, showAddForm, pageNum, pageCount, pages, sliceDataArray } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="async-spinner"></div>
    } else {
      return (
        <div>
          <div className="container">
            <Button
              type="button"
              title="Добавить"
              onClick={this.handleShowAddForm}
            />
            {showAddForm && (
              <FormAdd className="form-add" onSubmit={this.handleAddData} />
            )}
            <FormSearch className="form-search" onSubmit={this.handleSearchData} />
            <Table dataArray={sliceDataArray} onClick={this.handleSorting} />
            {pages > 1 && (
              <Pagination
                pageNum={pageNum}
                pages={pages}
                pageCount={pageCount}
                adjacents={1}
                onClick={this.handleChangePageNum} />
            )}
          </div>
        </div>
      );
    }
  }
}