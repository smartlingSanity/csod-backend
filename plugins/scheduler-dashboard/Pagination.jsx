import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styles from './pagination.css';

const Pagination = ({
  currentPage,
  marginPagesDisplayed,
  onPageChange,
  pageRangeDisplayed,
  totalPages,
}) => (
  <ReactPaginate
    forcePage={currentPage}
    previousLabel="<<"
    nextLabel=">>"
    containerClassName={styles.container}
    pageClassName={styles.page}
    pageLinkClassName={styles.pageLink}
    activeClassName={styles.active}
    activeLinkClassName={styles.activeLink}
    previousClassName={styles.previous}
    previousLinkClassName={styles.pageLink}
    nextClassName={styles.next}
    nextLinkClassName={styles.pageLink}
    pageCount={totalPages}
    marginPagesDisplayed={marginPagesDisplayed}
    pageRangeDisplayed={pageRangeDisplayed}
    onPageChange={({ selected }) => {
      onPageChange(selected + 1);
    }}
  />
);

Pagination.propTypes = {
  currentPage: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  pageRangeDisplayed: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  currentPage: null,
  marginPagesDisplayed: 2,
  pageRangeDisplayed: 2,
};

export default Pagination;
