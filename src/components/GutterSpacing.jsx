import React from "react";

const GutterSpacing = () => {
  const columnStyle = {
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    padding: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div className="container">
      <h3>No gutter (g-0)</h3>
      <div className="row  mb-3">
        <div className="col-6">
          <div style={columnStyle}>Column 1</div>
        </div>
        <div className="col-6">
          <div style={columnStyle}>Column 2</div>
        </div>
      </div>

      <h3>Small gutter (g-2)</h3>
      <div className="row g-2 mb-3">
        <div className="col-6">
          <div style={columnStyle}>Column 1</div>
        </div>
        <div className="col-6">
          <div style={columnStyle}>Column 2</div>
        </div>
      </div>

      <h3>Large gutter (g-5)</h3>
      <div className="row g-5 mb-3">
        <div className="col-6">
          <div style={columnStyle}>Column 1</div>
        </div>
        <div className="col-6">
          <div style={columnStyle}>Column 2</div>
        </div>
      </div>
    </div>
  );
};

export default GutterSpacing;
