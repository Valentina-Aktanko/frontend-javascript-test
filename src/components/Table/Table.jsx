import './Table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Table extends Component {
  state = {
    id: "none",
    firstName: "none",
    lastName: "none",
    email: "none",
    phone: "none",
  }

  static propTypes =  {
    dataArray: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (event) => {
    const { onClick } = this.props;
    const fieldName = event.target.dataset.name;
    let direction = this.state[fieldName];
    
    if (this.state[fieldName] === "none" || this.state[fieldName] === "desc") {
      direction = "asc";
    } else { 
      direction = "desc";
    };

    this.setState({
      id: "none",
      firstName: "none",
      lastName: "none",
      email: "none",
      phone: "none",
      [fieldName]: direction,
    }, () => {
      onClick(fieldName, direction);
    });
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
    )
  }

  render() {
    const { dataArray, handleTableSorting } = this.props;

    return (
        <table className="data-table">
          <thead>
            <tr>
              <th 
                data-name="id" 
                data-sort={this.state.id}
                onClick={this.handleClick}
              >
                id</th>
              <th 
                data-name="firstName" 
                data-sort={this.state.firstName}
                onClick={this.handleClick}
              >
                firstName
              </th>
              <th 
                data-name="lastName" 
                data-sort={this.state.lastName}
                onClick={this.handleClick}
              >
                lastName
              </th>
              <th 
                data-name="email" 
                data-sort={this.state.email}
                onClick={this.handleClick}
              >
                email
              </th>
              <th
                data-name="phone" 
                data-sort={this.state.phone}
                onClick={this.handleClick}
              >
                phone
              </th>
            </tr>
          </thead>
          <tbody>
            {dataArray.map((userData, idx) => this.renderRow(userData, idx))}
          </tbody>
        </table>
      );
  }
}