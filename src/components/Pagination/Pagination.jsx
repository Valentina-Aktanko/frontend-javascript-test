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
  }

  render() {
    const { currentPage, totalItems, limit, adjacents, onClick } = this.props;
    let targetpage = "/";
    let prev = currentPage - 1;			
    let next = currentPage + 1;
    let lastPage = Math.ceil(totalItems / limit);			
    // let start	
    
    return (
      <ul className="pagination">
        <PrevArrow currentPage={currentPage}/>
        <PageItems 
          currentPage={currentPage}
          lastPage={lastPage}
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
    lastPage: PropTypes.number.isRequired,
    adjacents: PropTypes.number.isRequired,
  }

  render() {
    const { currentPage, lastPage, adjacents } = this.props;
    const lastPageMinusOne = lastPage - 1;
    let pageItems = [];

    if (lastPage < 7 + (adjacents * 2))	{ //недостаточно страниц, чтобы ломать голову
			for (let counter = 1; counter <= lastPage; counter++) {
				if (counter == currentPage) {
          pageItems.push(
            <li className="pagination__item pagination__item--current">
              <a>{counter}</a>
            </li>
          );
        }
        else {
          pageItems.push(
            <li className="pagination__item">
              <a  href="#">{counter}</a>
            </li>
          );
        }
      }
      
    } else if(lastPage >= 7 + (adjacents * 2)) {	//достаточно страниц, чтобы скрыть некоторые
      // начало, скрыть только более поздние страницы
      if(currentPage < 1 + (adjacents * 3)) {
        for (let counter = 1; counter < 4 + (adjacents * 2); counter++) {
          if (counter == currentPage) {
            pageItems.push(
              <li className="pagination__item pagination__item--current">
                <a  href="#">{counter}</a>
              </li>
            );
          } else {
            pageItems.push(
              <li className="pagination__item">
                <a  href="#">{counter}</a>
              </li>
            );
          }
        }
        pageItems.push(
          <li className="pagination__item pagination__elipses">
            <a>...</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item">
            <a href="#">{lastPageMinusOne}</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item">
            <a href="#">{lastPage}</a>
          </li>
        );
      }
      //середина, скрыть немного в начале и немного в конце
			else if(lastPage - (adjacents * 2) > currentPage && currentPage > (adjacents * 2)) {
        pageItems.push(
          <li className="pagination__item">
            <a href="#">1</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item">
            <a href="#">2</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item pagination__elipses">
            <a>...</a>
          </li>
        );
				for (let counter = currentPage - adjacents; counter <= currentPage + adjacents; counter++)
				{
					if (counter == currentPage) {
            pageItems.push(
              <li className="pagination__item pagination__item--current">
                <a  href="#">{counter}</a>
              </li>
            );
          } else {
            pageItems.push(
              <li className="pagination__item">
                <a  href="#">{counter}</a>
              </li>
            );
          }
        }
        pageItems.push(
          <li className="pagination__item pagination__elipses">
            <a>...</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item">
            <a href="#">{lastPageMinusOne}</a>
          </li>
        );
        pageItems.push(
          <li className="pagination__item">
            <a href="#">{lastPage}</a>
          </li>
        );
			}
    }

    return pageItems;

  }
}