import React, { Component } from 'react';

class TableHead extends React.Component {
  render() {
    return (
      <tr>
        <th>id</th>
        <th>firstName</th>
        <th>lastName</th>
        <th>email</th>
        <th>phone</th>
      </tr>
    );
  }
}

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.userData.id}</td>
        <td>{this.props.userData.firstName}</td>
        <td>{this.props.userData.lastName}</td>
        <td>{this.props.userData.email}</td>
        <td>{this.props.userData.phone}</td>
      </tr>
    );
  }
}

export class Table extends Component {

  renderRow(userData, idx) {
    return <TableRow key={idx} userData={userData} />
  }

  render() {

    const { userDataArray } = this.props;

    return (
        <table className="data-table">
          <tbody>
            {<TableHead />}
            {userDataArray.map((userData, idx) => this.renderRow(userData, idx))}
          </tbody>
        </table>
      );
  }
}