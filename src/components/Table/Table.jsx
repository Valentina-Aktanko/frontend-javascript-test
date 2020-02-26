import './Table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Table extends Component {
  state = {
    sliceDataArray: [],
    sortingDirection: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
    }
  }

  static propTypes =  {
    dataArray: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dataArray, pageNum, pageCount } = this.props;

    this.setState({
      sliceDataArray: dataArray.slice((pageNum - 1) * pageCount, pageNum * pageCount),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageNum, pageCount } = this.props;

    if (this.props.dataArray !== prevProps.dataArray) {
      this.setState({
        sliceDataArray: this.props.dataArray.slice((pageNum - 1) * pageCount, pageNum * pageCount),
      });
    }
  }

  handleClick = (event) => {
    const { sortingDirection } = this.state;
    const { onClick } = this.props;
    const fieldName = event.target.dataset.name;
    let newDirection = null;
    
    if (sortingDirection[fieldName] === null || sortingDirection[fieldName] === "desc") {
      newDirection = "asc";
    } else { 
      newDirection = "desc";
    };

    if (typeof onClick === 'function' && newDirection !== null) {
      onClick(fieldName, newDirection);

      this.setState({
        sortingDirection : {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          [fieldName]: newDirection,
        },
      });
    } else console.log('Ошибка при сортировке данных!');
  }

  handleSorting = (fieldName, direction) => {
    
  }

  renderRow(userData, idx) {
    return (
      <tr key={idx}>
        <td>{userData.id}</td>
        <td>{userData.firstName}</td>
        <td>{userData.lastName}</td>
        <td>{userData.email}</td>
        <td>{userData.phone}</td>
      </tr>
    );
  }

  render() {
    const { sliceDataArray, sortingDirection } = this.state;
    const { dataArray, pageNum, pageCount } = this.props;

    return (
      <table className="data-table">
        <thead>
          <tr>
            <th 
              data-name="id" 
              data-sort={sortingDirection.id}
              onClick={this.handleClick} >
              id
            </th>
            <th 
              data-name="firstName" 
              data-sort={sortingDirection.firstName}
              onClick={this.handleClick} >
              firstName
            </th>
            <th 
              data-name="lastName" 
              data-sort={sortingDirection.lastName}
              onClick={this.handleClick} >
              lastName
            </th>
            <th 
              data-name="email" 
              data-sort={sortingDirection.email}
              onClick={this.handleClick} >
              email
            </th>
            <th
              data-name="phone" 
              data-sort={sortingDirection.phone}
              onClick={this.handleClick} >
              phone
            </th>
          </tr>
        </thead>
        <tbody>
          {sliceDataArray.map((userData, idx) => this.renderRow(userData, idx))}
        </tbody>
      </table>
    );
  }
}