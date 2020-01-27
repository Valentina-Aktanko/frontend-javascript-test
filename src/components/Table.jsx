import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Table extends Component {
  static propTypes =  {
    userDataArray: PropTypes.array.isRequired,
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
    const { userDataArray } = this.props;

    return (
        <table className="data-table">
          <thead>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            {userDataArray.map((userData, idx) => this.renderRow(userData, idx))}
          </tbody>
        </table>
      );
  }
}