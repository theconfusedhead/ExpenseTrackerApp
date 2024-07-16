import React, { useEffect, useState } from "react";
import AllExpense from "./AllExpense";
import { nanoid } from "nanoid";
const ExpenseForm = ({ getTotalExpense }) => {
  const getTodayDate = () => {
    const date = new Date();
    let dayDate = "" + date.getDate();
    let monthIndex = "" + (date.getMonth() + 1);
    const getFullYear = "" + date.getFullYear();
    if (monthIndex.length < 2) {
      monthIndex = "0" + monthIndex;
    }
    if (dayDate.length < 2) {
      dayDate = "0" + dayDate;
    }
    return [getFullYear, monthIndex, dayDate].join("-");
  };
  const [dataInput, setDataInput] = useState({
    id: nanoid(),
    expenseName: "",
    amount: "",
    date: getTodayDate(),
  });
  const [allExpense, setAllExpense] = useState(() => {
    const storedExpense = localStorage.getItem("allExpense");
    return JSON.parse(storedExpense) || [];
  });

  const handleChange = (e) => {
    setDataInput((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllExpense([...allExpense, dataInput]);
    setDataInput({
      id: nanoid(),
      expenseName: "",
      amount: "",
      date: getTodayDate(),
    });
  };
  useEffect(() => {
    const allExpenseTotal = allExpense?.reduce((totalExpense, expense) => {
      totalExpense += parseFloat(expense.amount);
      return totalExpense;
    }, 0);
    getTotalExpense(allExpenseTotal);
    localStorage.setItem("allExpense", JSON.stringify(allExpense));
    localStorage.setItem("totalExpense", JSON.stringify(allExpenseTotal));
  }, [allExpense]);
  const deleteExpense = (id) => {
    const newExpenses = allExpense.filter((expense) => {
      return expense.id !== id;
    });
    setAllExpense(newExpenses);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label class="form-label">Expense Name:</label>
        <input
          type="text"
          name="expenseName"
          value={dataInput.expenseName}
          onChange={handleChange}
          className="form-control"
        />
        <label class="form-label">Expense amount:</label>
        <input
          type="text"
          name="amount"
          value={dataInput.amount}
          onChange={handleChange}
          className="form-control"
        />
        <label>Expense date:</label>
        <input
          type="date"
          name="date"
          value={dataInput.date}
          onChange={handleChange}
          className="form-control"

        />
        <button type="submit" className="btn btn-secondary my-3">Submit</button>
      </form>
      <AllExpense allExpense={allExpense} deleteExpense={deleteExpense} />
    </>
  );
};

export default ExpenseForm;
