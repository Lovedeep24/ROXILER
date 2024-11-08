import React from 'react';
import styles from '../Styles/FilterPanel.module.css'; // Import the CSS module

const FilterPanel = ({ selectedMonth, onMonthChange, searchText, onSearchChange, onClearSearch }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className={styles.filterPanelContainer}>
      {/* Month Selector */}
      <div className={styles.filterPanelItem}>
        <label className={styles.filterPanelLabel}>Month:</label>
        <select
          className={styles.filterPanelSelect}
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <div className={styles.filterPanelItem2}>
        <label className={styles.filterPanelLabel}>Search Transactions:</label>
        <input
          className={styles.filterPanelInput}
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, description, price"
        />
        <button
          className={styles.filterPanelButton}
          onClick={onClearSearch}
          disabled={!searchText}  // Disable button if searchText is empty
        >
          Clear Search
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
