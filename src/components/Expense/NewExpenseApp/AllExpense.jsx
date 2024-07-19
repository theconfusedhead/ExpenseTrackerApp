import React from "react";
import { format } from "date-fns";

const AllExpense = ({ allExpense, deleteExpense, edit }) => {
  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const handleEdit = (id) => {
    edit(id);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Want":
        return "bg-info";
      case "Need":
        return "bg-primary";
      case "Investment":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="mt-5">
      <h4 className="mb-4">Your Expenses:</h4>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allExpense.map((expense, index) => {
              const formattedDate = format(new Date(expense.date), "dd MMM yy");
              return (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>
                    {expense.expenseName.charAt(0).toUpperCase() +
                      expense.expenseName.slice(1)}
                  </td>
                  <td>
                    <span
                      className={`badge ${getCategoryColor(expense.category)}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td>{parseFloat(expense.amount).toFixed(2)}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(expense.id)}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {allExpense.length === 0 && (
        <p className="text-center text-muted">No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default AllExpense;
