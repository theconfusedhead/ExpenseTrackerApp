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
    category: "Select Category",
    date: getTodayDate(),
  });

  const [allExpense, setAllExpense] = useState(() => {
    const storedExpense = localStorage.getItem("allExpense");
    return JSON.parse(storedExpense) || [];
  });

  const [isEditing, setIsEditing] = useState(false);

  const options = ["Select Category", "Need", "Want", "Investment"];

  const handleChange = (e) => {
    setDataInput((currentState) => {
      return { ...currentState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setAllExpense(
        allExpense.map((expense) =>
          expense.id === dataInput.id ? dataInput : expense
        )
      );
      setIsEditing(false);
    } else {
      setAllExpense([...allExpense, { ...dataInput, id: nanoid() }]);
    }
    setDataInput({
      id: nanoid(),
      expenseName: "",
      amount: "",
      category: "Select Category",
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
  }, [allExpense, getTotalExpense]);

  const deleteExpense = (id) => {
    const newExpenses = allExpense.filter((expense) => expense.id !== id);
    setAllExpense(newExpenses);
  };

  const editExpense = (id) => {
    const expenseToEdit = allExpense.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setDataInput(expenseToEdit);
      setIsEditing(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Expense Name:</label>
        <input
          type="text"
          name="expenseName"
          value={dataInput.expenseName}
          onChange={handleChange}
          className="form-control"
        />
        <label className="form-label">Expense amount:</label>
        <input
          type="text"
          name="amount"
          value={dataInput.amount}
          onChange={handleChange}
          className="form-control"
        />
        <label className="form-label">Expense Category:</label>
        <select
          className="form-control"
          name="category"
          value={dataInput.category}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="form-label">Expense date:</label>
        <input
          type="date"
          name="date"
          value={dataInput.date}
          onChange={handleChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-secondary my-3">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
      <AllExpense
        allExpense={allExpense}
        deleteExpense={deleteExpense}
        edit={editExpense}
      />
    </>
  );
};

export default ExpenseForm;
