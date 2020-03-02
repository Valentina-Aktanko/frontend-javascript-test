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
  }

  static propTypes = {
    pageNum: PropTypes.number.isRequired,
    pageCount: PropTypes.number,
    pages: PropTypes.number.isRequired,
    dataArray: PropTypes.array.isRequired,
    handleAddData: PropTypes.func.isRequired,
    handleSearchData: PropTypes.func.isRequired,
    handleClearSearch: PropTypes.func.isRequired,
    handleSortingData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pageCount: 50,
  };

  handleShowFormAdd = () => {
    this.setState({
      showFormAdd: !this.state.showFormAdd,
    });
  }

  render() {
    const { showFormAdd } = this.state;
    const { 
      pages,
      pageNum,
      pageCount,
      dataArray,
      handleAddData,
      handleSearchData,
      handleClearSearch,
      handleSortingData,
      handleChangePageNum } = this.props;
      
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
            onClick={handleChangePageNum} />
        )}
      </div>
    );
  }
}