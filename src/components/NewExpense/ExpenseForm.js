import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  //for event listeners
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //for conditional css for invalid input fields
  const [isValid, setIsValid] = useState(true);

  //event listeners
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    //check for valid input before submission
    if (expenseData.title.length === 0) {
      setIsValid(false);
      return;
    }
    if (expenseData.amount.length === 0) {
      setIsValid(false);
      return;
    }
    if (expenseData.date.toString() === 'Invalid Date') {
      setIsValid(false);
      return;
    }

    //save and reset form
    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setIsValid(true);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className={`new-expense__control ${!isValid ? 'invalid' : ''}`}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={`new-expense__control ${!isValid ? 'invalid' : ''}`}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={`new-expense__control ${!isValid ? 'invalid' : ''}`}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
