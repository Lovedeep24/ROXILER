import React from 'react';
import styles from '../Styles/StatsTable.module.css'; // Assume this file exists and has styling

const StatsTable = ({ stats }) => (
  <table className={styles.statsTable}>
    <thead>
      <tr>
        <th>Total Sale Amount</th>
        <th>Total Sold Items</th>
        <th>Total Not Sold Items</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{stats.totalSaleAmount}</td>
        <td>{stats.totalSoldItems}</td>
        <td>{stats.totalNotSoldItems}</td>
      </tr>
    </tbody>
  </table>
);

export default StatsTable;
