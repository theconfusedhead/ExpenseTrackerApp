import React, { useEffect, useState } from "react";

const SummaryView = () => {
  const [summaryData, setSummaryData] = useState("");
  const date = new Date();
  useEffect(() => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    let expenseMonth = months[date.getMonth()];
    const summaryView = {
      [expenseMonth]: {
        totalExpense: localStorage.getItem("totalExpense"),
        salary: localStorage.getItem("salary"),
      },
    };
    setSummaryData(summaryView);
    localStorage.setItem("summaryView", JSON.stringify(summaryView));
  }, []);
  // console.log(summaryData, "magic");
  const currentMonth = Object.keys(summaryData)[0];
  const result = summaryData[currentMonth];
  //   console.log(totalExpense)

  return (
    <div>
      <p>Summary View of {currentMonth}</p>
      {/* <p>{result.salary}</p> */}
      {/* <p>{result.totalExpense}</p> */}
    </div>
  );
};

export default SummaryView;
