import './Pagination.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { PaginationItems } from 'components/PaginationItems';

export class Pagination extends Component {

  static propTypes =  {
    pageNum: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    pageCount: PropTypes.number,
    adjacents: PropTypes.number,
    onClickArrow: PropTypes.func,
  }

  static defaultProps = {
    pageCount: 20,
    adjacents: 1,
  };

  handleClick = (event) => {
  }

  handleClickArrow = (event) => {

  }

  render() {
    const { pageNum, pages, pageCount, adjacents, onClickArrow } = this.props;
    
    return (
      <ul className="pagination">
        <PrevArrow 
          pageNum={pageNum}
          onClick={onClickArrow}/>
        <PageItems 
          pageNum={pageNum}
          pages={pages}
          adjacents={adjacents}
        />
        <NextArrow 
          pageNum={pageNum}
          pages={pages}
          onClick={onClickArrow}/>
      </ul>
    );
  }
}

export class PrevArrow extends Component {
  
  static propTypes =  {
    pageNum: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = (event) => {
    const { onClick } = this.props;

    event.preventDefault();

    if (typeof onClick === 'function') {
      onClick("prevPage");
    }
  }

  render() {
    const { pageNum, onClick } = this.props;

    if (pageNum === 1) {
      return (
        <li className="pagination__item pagination__item--disabled">
          <a>Назад</a>
        </li>
      );
    } else if (pageNum > 1) {
      return (
        <li className="pagination__item">
          <a href="#" onClick={this.handleClick}>Назад</a>
        </li>
      );
    }
  }
}

export class NextArrow extends Component {
  
  static propTypes =  {
    pageNum: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  }

  handleClick = (event) => {
    const { onClick } = this.props;

    event.preventDefault();

    if (typeof onClick === 'function') {
      onClick("nextPage");
    }
  }

  render() {
    const { pageNum, pages } = this.props;

    if (pageNum === pages) {
      return (
        <li className="pagination__item pagination__item--disabled">
          <a>Вперед</a>
        </li>
      );
    } else {
      return (
        <li className="pagination__item">
          <a href="#" onClick={this.handleClick}>Вперед</a>
        </li>
      );
    }
  }
}

export class PageItems extends Component {
  
  static propTypes =  {
    pageNum: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
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
    const { pageNum, pages, adjacents } = this.props;
    const lastPageMinusOne = pages - 1;
    let pageItems = [];

    // недостаточно страниц, чтобы ломать голову
    if (pages < 7 + (adjacents * 2))	{ 
			for (let counter = 1; counter <= pages; counter++) {
				if (counter == pageNum) {
          this.addPage(pageItems, 'pagination__item--current', counter);
        }
        else {
          this.addPage(pageItems, '', counter);
        }
      }
    
    // страниц достаточно, чтобы скрыть некоторые  
    } else if(pages >= 7 + (adjacents * 2)) {	
      
      // находимся в начале, скрыть только более поздние страницы
      if(pageNum < 1 + (adjacents * 3)) {
        for (let counter = 1; counter < 4 + (adjacents * 2); counter++) {
          if (counter == pageNum) {
            this.addPage(pageItems, 'pagination__item--current', counter);
          } else {
            this.addPage(pageItems, '', counter);
          }
        }
        this.addPage(pageItems, 'pagination__elipses', '...');
        this.addPage(pageItems, '', lastPageMinusOne);
        this.addPage(pageItems, '', pages);
      }

      // находимся в середине, скрыть немного в начале и немного в конце
      else if (pages - (adjacents * 2) > pageNum && 
        pageNum > (adjacents * 2)) {
        this.addPage(pageItems, '', 1);
        this.addPage(pageItems, '', 2);
        this.addPage(pageItems, 'pagination__elipses', '...');
				for (let counter = pageNum - adjacents; counter <= pageNum + adjacents; counter++)
				{
					if (counter == pageNum) {
            this.addPage(pageItems, 'pagination__item--current', counter);
          } else {
            this.addPage(pageItems, '', counter);
          }
        }
        this.addPage(pageItems, 'pagination__elipses', '...');
        this.addPage(pageItems, '', lastPageMinusOne);
        this.addPage(pageItems, '', pages);
      }
      
      // находимся в конце, скрыть только более ранние страницы
			else {
				this.addPage(pageItems, '', 1);
        this.addPage(pageItems, '', 2);
				this.addPage(pageItems, 'pagination__elipses', '...');
				for (let counter = pages - (1 + (adjacents * 3)); counter <= pages; counter++)
				{
					if (counter == pageNum) {
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