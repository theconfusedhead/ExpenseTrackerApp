import React from "react";
import { format } from "date-fns";
import "./style.css";
const AllExpense = ({ allExpense, deleteExpense }) => {
  const handleDelete = (id) => {
    console.log(id);
    deleteExpense(id);
  };
  const showExpense = allExpense.map((expense, index) => {
    const formattedDate = format(new Date(expense.date), "dd MMM");
    return (
      <div
        key={expense.id}
        className="row align-items-center bg-light p-2 mb-2 rounded"
      >
        <div className="col-1">{`${index + 1})`}</div>
        <div className="col-4">
          {`${expense.expenseName
            .charAt(0)
            .toUpperCase()}${expense.expenseName.slice(1)}`}
        </div>
        <div className="col-3">{expense.amount}</div>
        <div className="col-3">{formattedDate}</div>
        <div className="col-1">
          <button
            onClick={() => handleDelete(expense.id)}
            className="btn btn-secondary btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="mt-5">
      <h4>Your Expenses:</h4>
      <div class="row flex-nowrap overflow-auto bg-light p-2 mb-2 rounded">
        <div class="col-3 col-sm-1">
          <h3 class="fs-6 fs-sm-5 mb-0 text-nowrap">S No</h3>
        </div>
        <div class="col-3 col-sm-4">
          <h3 class="fs-6 fs-sm-5 mb-0 text-nowrap">Name</h3>
        </div>
        <div class="col-3 col-sm-3">
          <h3 class="fs-6 fs-sm-5 mb-0 text-nowrap">Amount</h3>
        </div>
        <div class="col-3 col-sm-4">
          <h3 class="fs-6 fs-sm-5 mb-0 text-nowrap">Date</h3>
        </div>
      </div>
      <div>{showExpense}</div>
    </div>
  );
};

export default AllExpense;
