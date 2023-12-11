// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transDetails, deleteTransaction} = props
  const {id, title, amount, type} = transDetails

  const onDeleteTrans = () => {
    deleteTransaction(id)
  }

  return (
    <li className="trans-item-container">
      <p className="trans-item">{title}</p>
      <p className="trans-item">Rs {amount}</p>
      <p className="trans-item">{type}</p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={onDeleteTrans}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
