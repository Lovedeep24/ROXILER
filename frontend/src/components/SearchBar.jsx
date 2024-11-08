import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import MonthSelector from './MonthSelector'; 
import MainStats from './FilterPanel'; 
import TransactionsTable from './TransactionTable'; 
import Pagination from './Pagination'; 

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3); // March by default
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState({ stats: true, transactions: true, charts: true });

  useEffect(() => {
    // Fetch all data when the selected month or search query changes
    fetchTransactions(selectedMonth, page, searchQuery);
  }, [selectedMonth, page, searchQuery]);

  useEffect(() => {
    // Fetch stats and charts when month changes
    fetchStats(selectedMonth);
    fetchBarChartData(selectedMonth);
    fetchPieChartData(selectedMonth);
  }, [selectedMonth]);

  const fetchTransactions = async (month, page, search) => {
    setLoading((prev) => ({ ...prev, transactions: true }));
    try {
      const response = await axios.get('http://localhost:5000/search-item', { params: { month, page, search } });
      setTransactions(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]); // Reset if there's an error
    } finally {
      setLoading((prev) => ({ ...prev, transactions: false }));
    }
  };

  const fetchStats = async (month) => {
    setLoading((prev) => ({ ...prev, stats: true }));
    try {
      const response = await axios.get('http://localhost:5000/stats', { params: { month } });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 }); // Default to 0 if there's an error
    } finally {
      setLoading((prev) => ({ ...prev, stats: false }));
    }
  };

  const fetchBarChartData = async (month) => {
    setLoading((prev) => ({ ...prev, charts: true }));
    try {
      const response = await axios.get('http://localhost:5000/barChart', { params: { month } });
      setBarChartData(response.data || { datasets: [] });
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setBarChartData({ datasets: [] });
    } finally {
      setLoading((prev) => ({ ...prev, charts: false }));
    }
  };

  const fetchPieChartData = async (month) => {
    setLoading((prev) => ({ ...prev, charts: true }));
    try {
      const response = await axios.get('http://localhost:5000/pieChart', { params: { month } });
      setPieChartData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      setPieChartData(null);
    } finally {
      setLoading((prev) => ({ ...prev, charts: false }));
    }
  };

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    setPage(1); // Reset to first page when month changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on new search
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <MonthSelector selectedMonth={selectedMonth} onChange={handleMonthChange} />
      <input
        type="text"
        placeholder="Search transactions"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={clearSearch}>Clear Search</button>
      <MainStats stats={stats} barChartData={barChartData} pieChartData={pieChartData} loading={loading.stats || loading.charts} />
      <TransactionsTable transactions={transactions} loading={loading.transactions} />
      <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Dashboard;
