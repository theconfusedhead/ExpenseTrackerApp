import React from "react";

const AllExpense = ({ allExpense, deleteExpense }) => {
  const handleDelete = (id) => {
    console.log(id);
    deleteExpense(id);
  };
  const showExpense = allExpense.map((expense, index) => {
    return (
      <div
        key={expense.id}
        className="d-flex align-items-center justify-content-between bg-light p-2 mb-2 rounded"
      >
        <span className="me-2">{`${index + 1})`}</span>
        <span className="flex-grow-1 me-2">
          {`${expense.expenseName
            .charAt(0)
            .toUpperCase()}${expense.expenseName.slice(1)}`}
        </span>
        <span className="me-2">{`${expense.amount} ${expense.date}`}</span>
        <button
          onClick={() => handleDelete(expense.id)}
          className="btn btn-secondary btn-sm"
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className="mt-5">
      <h4>Your Expenses:</h4>
      <div>{showExpense}</div>
    </div>
  );
};

export default AllExpense;
