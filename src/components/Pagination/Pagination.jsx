import './Pagination.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { PaginationItems } from 'components/PaginationItems';

export class Pagination extends Component {
  state = {
    // currentPage: 1,
  }

  static propTypes =  {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    limit: PropTypes.number,
    adjacents: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    limit: 20,
    adjacents: 1,
  };

  handleClick = (event) => {
    // const { onClick } = this.props;
    // const fieldName = event.target.dataset.name;
    // let direction = this.state[fieldName];
    
    // if (this.state[fieldName] === "none" || this.state[fieldName] === "desc") {
    //   direction = "asc";
    // } else { 
    //   direction = "desc";
    // };

    // this.setState({
    //   id: "none",
    //   firstName: "none",
    //   lastName: "none",
    //   email: "none",
    //   phone: "none",
    //   [fieldName]: direction,
    // }, () => {
    //   onClick(fieldName, direction);
    // });
  }

  render() {
    const { currentPage, totalItems, limit, adjacents, onClick } = this.props;
    let targetpage = "/";
    let prev = currentPage - 1;			
    let next = currentPage + 1;
    let lastpage = Math.ceil(totalItems / limit);			
    let lpm1 = lastpage - 1;
    let start	
    
    console.log(`currentPage = ${currentPage}, totalItems = ${totalItems}, limit= ${limit}, adjacents=${adjacents} onClick= ${onClick}`);

    if (currentPage > 1) {
      return (
        <ul className="pagination">
          <li className="pagination__item"><a href="#">Назад</a></li>
          
        </ul>
        );
    }
    else if (currentPage == 1) {
      return (
        <ul className="pagination">
          <li className="pagination__item pagination__item--disabled"><a>Назад</a></li>
          
          <li className="pagination__item pagination__item--current"><a>1</a></li>
          <li className="pagination__item"><a href="#">2</a></li>
          <li className="pagination__item"><a href="#">3</a></li>
          <li className="pagination__item"><a href="#">4</a></li>
        </ul>
        );
    }
  }
}