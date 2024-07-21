import React from "react";

const CategoryFilter = ({ allCategory, getFilterName }) => {
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
    <>
      Filter by Category:
      {allCategory.map((category) => {
        return (
          <button
            className={`badge btn-lg me-4 ${getCategoryColor(category)}`}
            key={category}
            onClick={() => getFilterName(category)}
          >
            {category}
          </button>
        );
      })}
    </>
  );
};

export default CategoryFilter;
