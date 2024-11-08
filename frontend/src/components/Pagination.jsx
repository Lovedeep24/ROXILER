import React from 'react';
import styles from '../Styles/Pagination.module.css';  // Import the CSS module

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handleClick = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`${styles.paginationButton} ${page === 1 ? styles.paginationButtonInactive : ''}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`${styles.paginationButton} ${page === index + 1 ? styles.paginationButtonActive : styles.paginationButtonInactive}`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`${styles.paginationButton} ${page === totalPages ? styles.paginationButtonInactive : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
