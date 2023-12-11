import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransList = transactionsList.filter(
      eachTrans => id !== eachTrans.id,
    )
    this.setState({
      transactionsList: updatedTransList,
    })
  }

  onAddTransactions = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTrans => eachTrans.optionId === optionId,
    )

    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[1].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTrans.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      } else {
        expensesAmount += eachTrans.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="box-container">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="welcome-note">
            Welcome back to your
            <span className="money-manager"> Money Manager </span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="trans-history-container">
          <form
            className="add-transaction-container"
            onSubmit={this.onAddTransactions}
          >
            <h1 className="heading">Add Transaction</h1>
            <label htmlFor="titleId" className="label-name">
              TITLE
            </label>
            <input
              type="text"
              placeholder="TITLE"
              className="text-input"
              id="titleId"
              value={titleInput}
              onChange={this.onChangeTitleInput}
            />

            <label htmlFor="amountId" className="label-name">
              AMOUNT
            </label>
            <input
              type="text"
              placeholder="AMOUNT"
              className="text-input"
              id="amountId"
              value={amountInput}
              onChange={this.onChangeAmountInput}
            />

            <label htmlFor="select" className="label-name">
              TYPE
            </label>
            <select
              className="text-input"
              id="select"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="heading">History</h1>
            <div>
              <ul className="list-container">
                <li className="history-items">
                  <p className="item-name">Title</p>
                  <p className="item-name">Amount</p>
                  <p className="item-name">Type</p>
                </li>
              </ul>
              {transactionsList.map(eachTrans => (
                <TransactionItem
                  key={eachTrans.id}
                  transDetails={eachTrans}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
