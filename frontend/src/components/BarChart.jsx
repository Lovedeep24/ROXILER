import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../Styles/BarChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transactions Range',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        // Use category scale to arrange the bars correctly
        type: 'category',
        // Adjust the spacing between the bars
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#ddd',
        },
      },
    },
    barThickness: 30, // Adjust the bar thickness
  };

  return (
    <div className={styles.main}>
      <div className={styles.chartContainer}>
        {data ? <Bar data={data} options={options} /> : <div>No data available for the chart.</div>}
      </div>
    </div>
  );
};

export default BarChart;
