import styles from '../Styles/MonthSelector.module.css';
const MonthSelector = ({ selectedMonth, onChange }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    return (
      <div className={styles.main}>
        <label className={styles.labels}>Month:</label>
        <select className={styles.selects} value={selectedMonth} onChange={(e) => onChange(Number(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default MonthSelector;
  