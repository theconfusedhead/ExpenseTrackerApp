import React, { useState, useRef, useEffect } from "react";
import "./ExpenseStyle.css";
const Expense = () => {
  const focus = useRef(null);
  const disable = useRef(null);
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
  });
  const [salary, setSalary] = useState("");
  const [allExpense, setAllExpense] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const handleChange = (e) => {
    setExpense((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };
  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.amount || !expense.name) {
      focus.current.focus();
      return;
    }
    setSalary("");
    setExpense({
      name: "",
      amount: "",
    });
    disable.current.disabled = "true";
    focus.current.focus();
    setAllExpense((currentExpense) => {
      return [...currentExpense, expense];
    });
  };
  //   console.log(allExpense);
  useEffect(() => {
    const totalExpense = allExpense.reduce((sumOfExpense, currentExpense) => {
      sumOfExpense += parseFloat(currentExpense.amount) || 0;
      return sumOfExpense;
    }, 0);
    setTotalExpense(totalExpense);
  }, [allExpense]);
  return (
    <div className="container-fluid border p-2">
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
      <div className="row">
        <div className="col-lg-12">
          <div className="mt-2">
            {allExpense.map((expense, index) => {
              return (
                <div key={index}>
                  <span>{index + 1} ) </span>
                  <span className="text-capitalize">{expense.name}</span>
                  <span>- {expense.amount} </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
