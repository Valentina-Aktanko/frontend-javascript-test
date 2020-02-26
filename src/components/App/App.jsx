import './App.scss';

import React, { Component } from 'react';

import { Spinner } from 'components/Spinner';
import { Layout } from '../Layout/Layout';

export class App extends Component {
  state = {
    smallDataSet: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    bigDataSet: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    error: null,
    isLoaded: false,
    fullDataArray: [],
    dataArray: [],
  }

  componentDidMount() {
    const { bigDataSet } = this.state;

    fetch(bigDataSet)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            fullDataArray: result,
            dataArray: result,
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

  handleAddData = (newData) => {
    this.setState(prevState => {
      let dataArray = prevState.dataArray;
      let fullDataArray = prevState.fullDataArray;

      fullDataArray.unshift(newData);
      dataArray.unshift(newData);
      return { fullDataArray, dataArray };
    });
  }

  handleSearchData = (searchText) => {
    const { dataArray } = this.state;
    searchText = searchText.toLowerCase();
    let filterArray = dataArray.filter(item =>
      String(item.id).includes(searchText) ||
      item.firstName.toLowerCase().includes(searchText) ||
      item.lastName.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.phone.toLowerCase().includes(searchText));
    this.setState({
      dataArray: filterArray,
    });
  }

  handleClearSearch = () => {
    // TODO: Immutable.map
    const { fullDataArray } = this.state;
    this.setState({
      dataArray: fullDataArray,
    });
  }

  handleSortingData = (fieldName, sortDirection) => {
    let sliceDataArray = Array.from(this.state.dataArray);

    if (fieldName === 'id' && sortDirection === "asc") {
      sliceDataArray.sort(function (a, b) {
        return a[fieldName] - b[fieldName];
      });
    } else if (fieldName === 'id' && sortDirection === "desc") {
      sliceDataArray.sort(function (a, b) {
        return b[fieldName] - a[fieldName];
      });
    } else if (fieldName !== 'id' && sortDirection === "asc") {
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
    } else if (fieldName !== 'id' && sortDirection === "desc") {
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
      dataArray: sliceDataArray,
    });
  }

  render() {
    const { error, isLoaded, dataArray } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <Spinner />
    } else {
      return (
        <Layout 
          dataArray={dataArray}
          handleAddData={this.handleAddData}
          handleSearchData={this.handleSearchData}
          handleClearSearch={this.handleClearSearch}
          handleSortingData={this.handleSortingData}
        />
      );
    }
  }
}