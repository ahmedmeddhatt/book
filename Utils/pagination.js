// pagination.js

exports.pagination = (page, limit, totalItems) => {
    const currentPage = parseInt(page, 10) || 1;
    const perPage = parseInt(limit, 5) || 5;
    const totalPages = Math.ceil(totalItems / perPage);
    const offset = (currentPage - 1) * perPage;
  
    return {
        currentPage,
        perPage,
        totalPages,
        offset
    };
};
