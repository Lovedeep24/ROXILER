// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from './FilterPanel'; 
import BarChart from './BarChart'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Pagination from './Pagination';
import TransactionsTable from './TransactionTable';
import StatsTable from './StatsTable'
import styles from '../Styles/Dashboard.module.css';
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(3); // March by default
  const [stats, setStats] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  const [barChartData, setBarChartData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTransactions(selectedMonth, searchText, page);
    fetchStats(selectedMonth);
    fetchBarChartData(selectedMonth);
  }, [selectedMonth, searchText, page]);

  // Fetch transaction data
  const fetchTransactions = async (month, search, page) => {
    try {
      const response = await axios.get('http://localhost:5000/search-item', {
        params: { month, search, page }
      });
      setTransactions(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats data
  const fetchStats = async (month) => {
    try {
      const response = await axios.get('http://localhost:5000/stats', {
        params: { month }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch bar chart data
  const fetchBarChartData = async (month) => {
    try {
      const response = await axios.get('http://localhost:5000/barChart', {
        params: { month }
      });
      const data = response.data;

      const chartData = {
        labels: data.map(item => item.range),
        datasets: [
          {
            label: 'Transactions by Range',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
      setBarChartData(chartData);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setBarChartData(null);
    }
  };

  return (
    <div>
      {/* Filter Panel with Month Selector and Search Bar */}
      <FilterPanel
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        searchText={searchText}
        onSearchChange={setSearchText}
        onClearSearch={() => setSearchText('')}
      />

      {/* Bar Chart */}
      <BarChart data={barChartData} />
      <StatsTable stats={stats} />

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Dashboard;
