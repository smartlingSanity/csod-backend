const getSanityDocumentsPage = (page, perPage) => {
  if (typeof page === 'number' && typeof perPage === 'number') {
    const previousPageLastNumber = (page - 1) * perPage;
    return `[${previousPageLastNumber}...${previousPageLastNumber + perPage}]`;
  }
  return '';
};

module.exports = {
  getSanityDocumentsPage,
};
