import React from 'react';
import Dashboard from './components/Dashboard';
import styles from './Styles/App.module.css';
function App() {
  return (
    <div className={styles.App}>
      <h1>Data Dashboard</h1>
      <Dashboard />
    </div>
  );
}

export default App;
