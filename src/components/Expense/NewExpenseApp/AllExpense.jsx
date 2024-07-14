import React from "react";

const AllExpense = ({ allExpense, deleteExpense }) => {
  const handleDelete = (id) => {
    console.log(id);
    deleteExpense(id);
  };
  const showExpense = allExpense.map((expense, index) => {
    return (
      <div key={expense.id} className="col-4 d-flex align-items-center justify-content-around">
        <p>{`${index + 1})`}</p>
        <p>
          {`${expense.expenseName
            .charAt(0)
            .toUpperCase()}${expense.expenseName.slice(1)}`}
        </p>

        <p>{`${expense.amount} ${expense.date}`}</p>
        <button onClick={() => handleDelete(expense.id)}>Delete</button>
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
