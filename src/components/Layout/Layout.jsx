import './Layout.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button';
import { FormAdd } from 'components/FormAdd';
import { FormSearch } from 'components/FormSearch';
import { Table } from 'components/Table';
import { Pagination } from 'components/Pagination';

export class Layout extends Component {
  state = {
    showFormAdd: false,
    pageNum: 1,
    pageCount: 50,
    pages: 1,
  }

  static propTypes = {
    dataArray: PropTypes.array.isRequired,
    handleAddData: PropTypes.func.isRequired,
    handleSearchData: PropTypes.func.isRequired,
    handleClearSearch: PropTypes.func.isRequired,
    handleSortingData: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { pageCount } = this.state;
    const { dataArray } = this.props;

    this.setState({
      pages: Math.ceil(dataArray.length / pageCount),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageCount } = this.state;
    const { dataArray } = this.props;

    if (dataArray !== prevProps.dataArray) {
      this.setState({
        pages: Math.ceil(dataArray.length / pageCount),
      });
    }
  }

  handleShowFormAdd = () => {
    this.setState({
      showFormAdd: !this.state.showFormAdd,
    });
  }

  handleChangePageNum = (btn) => {

    this.setState(prevState => {
      let pageNum = prevState.pageNum;

      if (btn === "nextPage") {
        pageNum = pageNum + 1;
      } else if (btn === "prevPage") {
        pageNum = pageNum - 1;
      } else if (typeof btn === "number" && !isNaN(btn)) {
        pageNum = btn;
      } else pageNum = pageNum;

      return { pageNum };
    });
  }

  render() {
    const { showFormAdd, pageNum, pageCount, pages } = this.state;
    const { 
      dataArray,
      handleAddData,
      handleSearchData,
      handleClearSearch,
      handleSortingData } = this.props;

    return (
      <div className="container">
        <Button
          type="button"
          title="Добавить"
          onClick={this.handleShowFormAdd}
        />
        {showFormAdd && (
          <FormAdd className="form-add" onSubmit={handleAddData} />
        )}
        <FormSearch 
          className="form-search"
          onSubmit={handleSearchData}
          onChange={handleClearSearch}/>
        <Table 
          dataArray={Array.from(dataArray)} 
          pageNum={pageNum}
          pageCount={pageCount}
          onClick={handleSortingData} />
        {pages > 1 && (
          <Pagination
            pageNum={pageNum}
            pages={pages}
            pageCount={pageCount}
            adjacents={1}
            onClick={this.handleChangePageNum} />
        )}
      </div>
    );
  }
}