import React, { useState } from "react";
import { format } from "date-fns";

const AllExpense = ({ allExpense, deleteExpense, edit }) => {
  // const [editExpense, setEditExpense] = useState("");
  const handleDelete = (id) => {
    deleteExpense(id);
  };
  const handleEdit = (id) => {
    edit(id);
  };
  const showExpense = allExpense.map((expense, index) => {
    const formattedDate = format(new Date(expense.date), "dd MMM yy");
    let expenseCategoryColor = ``;

    if (expense.category == "Want") {
      expenseCategoryColor = `badge text-bg-info text-white mx-5`;
    } else if (expense.category == "Need") {
      expenseCategoryColor = `badge text-bg-primary text-white mx-5`;
    } else if (expense.category == "Investment") {
      expenseCategoryColor = `badge text-bg-warning  mx-5`;
    }
    return (
      <div
        key={expense.id}
        className="row align-items-center bg-light p-2 mb-2 rounded"
      >
        <div className="col-1">{`${index + 1})`}</div>
        <div className="col-3">
          {`${expense.expenseName
            .trim()
            .charAt(0)
            .toUpperCase()}${expense.expenseName.slice(1)}`}
          <span className={expenseCategoryColor}>{expense.category}</span>
        </div>
        <div className="col-3">{expense.amount}</div>
        <div className="col-3">{formattedDate}</div>
        <div className="col-2">
          <button
            onClick={() => handleDelete(expense.id)}
            className="btn btn-secondary btn-sm"
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(expense.id)}
            className="btn btn-secondary btn-sm mx-2"
          >
            Edit
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
