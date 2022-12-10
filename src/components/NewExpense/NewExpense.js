import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {

  //opens/closes editing window
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {

    //enrich input with unique id
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    //add expense and close window
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  //opens editing window
  const startEditingHandler = () => {
    setIsEditing(true);
  };

  //closes editing window
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
