import React, { useEffect, useRef, useState } from "react";
import AllExpense from "./AllExpense";
import { nanoid } from "nanoid";
import Categories from "./CategoryFilter";
import Modal from "./Modal";
const ExpenseForm = ({ getTotalExpense }) => {
  const formRef = useRef(null);
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
  const [isOpen, setIsOpen] = useState(false);
  const [cateFilterName, setCateFilterName] = useState("all");
  const [allExpense, setAllExpense] = useState(() => {
    const storedExpense = localStorage.getItem("allExpense");
    return JSON.parse(storedExpense) || [];
  });
  const [filteredExpenses, setFilteredExpenses] = useState(allExpense);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryExpenseTotal, setCategoryExpenseTotal] = useState("");
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
    setFilteredExpenses(allExpense);
    // setCategoryExpenseTotal(allExpenseTotal);
  }, [allExpense, getTotalExpense]);

  const deleteExpense = (id) => {
    setIsOpen(true);
    setExpenseToDelete(id);
  };
  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      const newExpenses = allExpense.filter(
        (expense) => expense.id !== expenseToDelete
      );
      setAllExpense(newExpenses);
      setIsOpen(false);
      setExpenseToDelete(null);
    }
  };

  const editExpense = (id) => {
    const expenseToEdit = allExpense.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setDataInput(expenseToEdit);
      setIsEditing(true);
    }
    setTimeout(() => {
      formRef?.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const allCategory = [
    "all",
    ...new Set(
      allExpense.map((expense) => {
        return expense.category;
      })
    ),
  ];
  const getFilterName = (categoryName) => {
    if (categoryName === "all") {
      setFilteredExpenses(allExpense);
      setCateFilterName(categoryName);
    } else {
      setCateFilterName(categoryName);
      const newExpenseListByCategory = allExpense.filter(
        (expense) => expense.category === categoryName
      );
      const totalNewExpenseListCategory = newExpenseListByCategory.reduce(
        (total, acc) => {
          total += parseFloat(acc.amount);
          return total;
        },
        0
      );
      setCategoryExpenseTotal(totalNewExpenseListCategory);
      setFilteredExpenses(newExpenseListByCategory);
      console.log(totalNewExpenseListCategory);
    }
  };
  const generateCSV = (expenses) => {
    const headers = ["Expense Name", "Amount", "Category", "Date"];
    const rows = expenses.map((expense) => [
      expense.expenseName,
      expense.amount,
      expense.category,
      expense.date,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };
  const downloadCSV = () => {
    const csvContent = generateCSV(filteredExpenses);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "expenses.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleCancelDelete = () => {
    setIsOpen(false);
    setExpenseToDelete(null);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        message={"do you want to delete the following expense?"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <form onSubmit={handleSubmit} ref={formRef}>
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

      <Categories allCategory={allCategory} getFilterName={getFilterName} />

      {cateFilterName !== "all" && (
        <div class="p-3 my-2 bg-success text-white">
          Total of {cateFilterName}: {categoryExpenseTotal}{" "}
        </div>
      )}

      <div>
        <button onClick={downloadCSV} className="btn btn-primary my-3">
          Download Expenses
        </button>
      </div>
      <AllExpense
        allExpense={filteredExpenses}
        deleteExpense={deleteExpense}
        edit={editExpense}
      />
    </>
  );
};

export default ExpenseForm;
