import './Pagination.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
        <PrevArrow 
          currentPage={currentPage}/>
        <PageItems 
          currentPage={currentPage}
          lastPage={lastPage}
          adjacents={adjacents}
        />
        <NextArrow 
          currentPage={currentPage}
          lastPage={lastPage}/>
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

  addPage(pageItems, className, counter) {
    const classes = classNames('pagination__item', [className]);

    if (className === 'pagination__item--current' || className === 'pagination__elipses') {
      pageItems.push( 
        <li key={pageItems.length} // наверное, странный ключ. Но лучше пока ничего не придумалось
            className={classes}>
          <a>{counter}</a>
        </li>
      );
    } else if (className === '') {
      pageItems.push(
        <li key={pageItems.length}
            className={classes}>
          <a href="#">{counter}</a>
        </li>
      );
    }
    return pageItems;
  }

  render() {
    const { currentPage, lastPage, adjacents } = this.props;
    const lastPageMinusOne = lastPage - 1;
    let pageItems = [];

    if (lastPage < 7 + (adjacents * 2))	{ //недостаточно страниц, чтобы ломать голову
			for (let counter = 1; counter <= lastPage; counter++) {
				if (counter == currentPage) {
          this.addPage(pageItems, 'pagination__item--current', counter);
        }
        else {
          this.addPage(pageItems, '', counter);
        }
      }
      
    } else if(lastPage >= 7 + (adjacents * 2)) {	//страниц достаточно, чтобы скрыть некоторые
      
      // находимся в начале, скрыть только более поздние страницы
      if(currentPage < 1 + (adjacents * 3)) {
        for (let counter = 1; counter < 4 + (adjacents * 2); counter++) {
          if (counter == currentPage) {
            this.addPage(pageItems, 'pagination__item--current', counter);
          } else {
            this.addPage(pageItems, '', counter);
          }
        }
        this.addPage(pageItems, 'pagination__elipses', '...');
        this.addPage(pageItems, '', lastPageMinusOne);
        this.addPage(pageItems, '', lastPage);
      }

      // находимся в середине, скрыть немного в начале и немного в конце
			else if(lastPage - (adjacents * 2) > currentPage && currentPage > (adjacents * 2)) {
        this.addPage(pageItems, '', 1);
        this.addPage(pageItems, '', 2);
        this.addPage(pageItems, 'pagination__elipses', '...');
				for (let counter = currentPage - adjacents; counter <= currentPage + adjacents; counter++)
				{
					if (counter == currentPage) {
            this.addPage(pageItems, 'pagination__item--current', counter);
          } else {
            this.addPage(pageItems, '', counter);
          }
        }
        this.addPage(pageItems, 'pagination__elipses', '...');
        this.addPage(pageItems, '', lastPageMinusOne);
        this.addPage(pageItems, '', lastPage);
      }
      
      // находимся в конце, скрыть только более ранние страницы
			else {
				this.addPage(pageItems, '', 1);
        this.addPage(pageItems, '', 2);
				this.addPage(pageItems, 'pagination__elipses', '...');
				for (let counter = lastPage - (1 + (adjacents * 3)); counter <= lastPage; counter++)
				{
					if (counter == currentPage) {
            this.addPage(pageItems, 'pagination__item--current', counter);
          } else {
            this.addPage(pageItems, '', counter);
          }
				}
			}
    }

    return pageItems;

  }
}

export class NextArrow extends Component {
  
  static propTypes =  {
    currentPage: PropTypes.number.isRequired,
  }

  render() {
    const { currentPage, lastPage } = this.props;

    if (currentPage === lastPage) {
      return (
        <li className="pagination__item pagination__item--disabled">
          <a>Вперед</a>
        </li>
      );
    } else {
      return (
        <li className="pagination__item">
          <a href="#">Вперед</a>
        </li>
      );
    }
  }
}