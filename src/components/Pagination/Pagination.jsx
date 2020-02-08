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
    
    console.log(`currentPage = ${currentPage}, totalItems = ${totalItems}, limit= ${limit}, adjacents=${adjacents} onClick=${onClick}`);

    return (
      <ul className="pagination">
        {/* {this.createPagination(currentPage)} */}
        <PrevArrow currentPage={currentPage}/>
        <PageItems 
          currentPage={currentPage}
          lastpage={lastpage}
          adjacents={adjacents}
        />
        
      </ul>
    );
  }
}

export class PrevArrow extends Component {
  
  static propTypes =  {
    currentPage: PropTypes.number.isRequired,
  }

  render() {
    const { currentPage } = this.props;

    if (currentPage === 1) {
      return (
        <li className="pagination__item pagination__item--disabled">
          <a>Назад</a>
        </li>
      );
    } else if (currentPage > 1) {
      return (
        <li className="pagination__item">
          <a href="#">Назад</a>
        </li>
      );
    }
  }
}

export class PageItems extends Component {
  
  static propTypes =  {
    currentPage: PropTypes.number.isRequired,
    lastpage: PropTypes.number.isRequired,
    adjacents: PropTypes.number.isRequired,
  }

  render() {
    const { currentPage, lastpage, adjacents } = this.props;
    let pageItems = [];

    if (lastpage < 7 + (adjacents * 2))	{ //недостаточно страниц, чтобы ломать голову
			for (let counter = 1; counter <= lastpage; counter++) {
				if (counter == currentPage) {
          pageItems.push(
            <li className="pagination__item pagination__item--current">
              <a>{counter}</a>
            </li>);
        }
        else {
          pageItems.push(
            <li className="pagination__item">
              <a  href="#">{counter}</a>
            </li>);
        }
      }

      return pageItems;

    }
  }
}