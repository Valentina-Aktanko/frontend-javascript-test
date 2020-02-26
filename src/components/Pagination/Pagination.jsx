import './Pagination.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


export class Pagination extends Component {

  static propTypes =  {
    pageNum: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    pageCount: PropTypes.number,
    adjacents: PropTypes.number,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    pageCount: 20,
    adjacents: 1,
  };

  render() {
    const { pageNum, pages, adjacents, onClick } = this.props;
    
    return (
      <List className="pagination">
        <PrevArrow 
          pageNum={pageNum}
          onClick={onClick}
        />
        <PageItems 
          pageNum={pageNum}
          pages={pages}
          adjacents={adjacents}
          onClick={onClick}
        />
        <NextArrow 
          pageNum={pageNum}
          pages={pages}
          onClick={onClick}
        />
      </List>
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
    const { pageNum } = this.props;
    
    if (pageNum === 1) {
      return (
        <ListItem className="pagination__item pagination__item--disabled" disableGutters={true}>
          <a>
            <ListItemText primary="Назад"></ListItemText>
          </a>
        </ListItem>
      );
    } else if (pageNum > 1) {
      return (
        <ListItem className="pagination__item" disableGutters={true}>
          <Link to={`/page/${pageNum-1}`} onClick={this.handleClick} >
            <ListItemText primary="Назад"></ListItemText>
          </Link>
        </ListItem>
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
        <ListItem className="pagination__item pagination__item--disabled" disableGutters={true}>
          <a>
            <ListItemText primary="Вперед"></ListItemText>
          </a>
        </ListItem>
      );
    } else {
      return (
        <ListItem className="pagination__item" disableGutters={true}>
          <Link to={`/page/${pageNum+1}`} onClick={this.handleClick} >
            <ListItemText primary="Вперед"></ListItemText>
          </Link>
        </ListItem>
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

  handleClick = (event) => {
    const { onClick } = this.props;

    event.preventDefault();

    if (typeof onClick === 'function') {
      onClick(+event.target.textContent);
    }
  }

  addPage(pageItems, className, counter) {
    const classes = classNames('pagination__item', [className]);

    if (className === 'pagination__item--current' || className === 'pagination__elipses') {
      pageItems.push( 
        <ListItem className={classes} key={pageItems.length} disableGutters={true}>
          <a>
            <ListItemText primary={counter}></ListItemText>
          </a>
        </ListItem>
      );
    } else if (className === '') {
      pageItems.push(
        <ListItem className={classes} key={pageItems.length} disableGutters={true}>
          <Link to={`/page/${counter}`} onClick={this.handleClick} >
            <ListItemText primary={counter}></ListItemText>
          </Link>
        </ListItem>
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