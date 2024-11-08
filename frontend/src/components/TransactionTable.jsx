import styles from '../Styles/TransactionTable.module.css';

const TransactionsTable = ({ transactions }) => (
  <div className={styles.mainTransaction}>
    <table className={styles.transactionTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.title}</td>
            <td>{transaction.description}</td>
            <td>{transaction.price}</td>
            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
  
  export default TransactionsTable;
  