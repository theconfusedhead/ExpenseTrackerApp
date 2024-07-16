import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import SummaryView from "./SummaryView";
const Salary = () => {
  const [salary, setSalary] = useState(() => {
    const storedSalary = localStorage.getItem("salary");
    return storedSalary || "";
  });
  const [inputSalary, setInputSalary] = useState(() => {
    const storedSalary = localStorage.getItem("salary");
    return storedSalary || "";
  });
  const [totalExpense, setTotalExpense] = useState("");
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };
  const handleSalarySubmit = (e) => {
    e.preventDefault();
    setInputSalary(salary);
    localStorage.setItem("salary", salary);
  };

  const getTotalExpense = (total) => {
    setTotalExpense(total);
  };
  const resetMonth = () => {
    localStorage.removeItem("salary");
    localStorage.removeItem("allExpense");
    localStorage.removeItem("totalExpense");
    setInputSalary("");
    setSalary("");
    setTotalExpense("");
  };
  const remainingSalary = parseFloat(inputSalary) - parseFloat(totalExpense);

  return (
    <>
      <div className="container">
        <h1 className="text-center display-4">Your Monthly Expense Tracker</h1>
        <div className="row d-flex justify-content-around mt-5">
          <div className="col">
            <form onSubmit={handleSalarySubmit}>
              <div className="mb-3">
                <label class="form-label">Salary:</label>
                <input
                  type="text"
                  onChange={handleSalary}
                  value={salary}
                  name="salary"
                  class="form-control"
                />
              </div>
              <button type="submit" className="btn btn-secondary">
                Enter your Salary!
              </button>
              <button
                type="button"
                className="btn btn-secondary m-3"
                onClick={resetMonth}
              >
                Reset Month
              </button>
            </form>
          </div>
          <div className="col">
            <div className="text-center">
              <p class="lead">
                {inputSalary ? `Your salary is: ${inputSalary}` : ""}
              </p>
              <p class="lead">
                {" "}
                {inputSalary ? `Your total expense: ${totalExpense}` : ""}
              </p>
              <p class="lead">
                {inputSalary ? `Your remaining salary: ${remainingSalary}` : ""}
              </p>
            </div>
          </div>
        </div>
        <div>
          {inputSalary && <ExpenseForm getTotalExpense={getTotalExpense} />}
        </div>
      </div>
    </>
  );
};

export default Salary;
