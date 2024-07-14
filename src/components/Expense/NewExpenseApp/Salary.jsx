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
    <div className="container">
      <h1 className="text-center">Your Monthly Expense Tracker</h1>
      <div className="row mt-5">
        <div className="col-6">
          <form onSubmit={handleSalarySubmit}>
            <label>Salary:</label>
            <input
              type="text"
              onChange={handleSalary}
              value={salary}
              name="salary"
            />
            <button type="submit">Enter your Salary!</button>
            <button type="button" onClick={resetMonth}>
              Reset Month
            </button>
          </form>
        </div>
        <div className="col-3">
          <p>{inputSalary ? `Your salary is: ${inputSalary}` : ""}</p>
          <p>{inputSalary ? `Your total expense: ${totalExpense}` : ""}</p>
          <p>
            {inputSalary ? `Your remaining salary: ${remainingSalary}` : ""}
          </p>
        </div>
        <div className="col-3">
          <SummaryView />
        </div>
      </div>
      {inputSalary && (
        <div className="row">
          <div className="col">
            <ExpenseForm getTotalExpense={getTotalExpense} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Salary;
