import { useState } from 'react';

export default function usePagination(initialPerPage = 1) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  const goNextPage = () => {
    setPage(page + 1);
  };

  const goPreviousPage = () => {
    setPage(page - 1);
  };

  const goFirstPage = () => {
    setPage(1);
  };

  const goLastPage = () => {
    setPage(totalPages);
  };

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
    perPage,
    setPerPage,
    goFirstPage,
    goNextPage,
    goLastPage,
    goPreviousPage,
  };
}
