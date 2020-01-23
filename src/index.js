import React from 'react';
import ReactDom from 'react-dom';

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

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userDataArray: [],
    };
  }

  componentDidMount() {
    fetch("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
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

  renderRow(userData, idx) {
    return <TableRow key={idx} userData={userData} />
  }

  render() {

    const { error, isLoaded, userDataArray } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <table className="data-table">
          <tbody>
            <tr>
              <th>id</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>phone</th>
            </tr>
  
            {userDataArray.map((userData, idx) => this.renderRow(userData, idx))}
  
          </tbody>
        </table>
      );
    }
    
  }
}

class App extends React.Component {
  
  render() {
    return (
      <Table />
    )
  } 
}

ReactDom.render(
  <App />,
  document.getElementById('root'),
)