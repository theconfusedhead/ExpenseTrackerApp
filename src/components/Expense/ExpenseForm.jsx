import React from "react";

const ExpenseForm = () => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
          <h1>Expense Tracker</h1>
          <div className="mb-2">
            <label>Salary:</label>
            <input
              type="text"
              onChange={handleSalary}
              value={salary}
              name="name"
              ref={disable}
            />
          </div>
          <div className="mb-2">
            <label>Expense Name:</label>
            <input
              type="text"
              onChange={handleChange}
              value={expense.name}
              name="name"
              ref={focus}
            />
          </div>
          <div className="mb-2">
            <label>Amount:</label>
            <input
              type="number"
              onChange={handleChange}
              value={expense.amount}
              name="amount"
            />
          </div>
          <button className="btn btn-primary">Add Expense!</button>
        </form>
      </div>
      <div className="col-lg-6">
        <div className="row cols-row-2">
          <div className="col">
            <h1>Total:{totalExpense}</h1>
          </div>
          <div className="col">
            <h1>Salary:{salary}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
