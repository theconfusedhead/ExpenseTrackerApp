import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const TwoColumnComponent = () => {
  const bannerStyle = {
    backgroundImage: 'url("path/to/your/banner-image.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "300px", // Adjust as needed
    position: "relative",
  };

  const shadowOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // Adjust opacity as needed
    boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)", // Inner shadow
  };

  return (
    <div className="container-fluid p-0">
      <div style={bannerStyle}>
        <div style={shadowOverlayStyle}></div>
        <div className="container">
          <div
            className="row"
            style={{ minHeight: "300px", position: "relative", zIndex: 1 }}
          >
            <div className="col-md-6 d-flex align-items-center justify-content-center text-white">
              <div>
                <h2>Left Column</h2>
                <p>Content for the left side of the banner.</p>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center text-white">
              <div>
                <h2>Right Column</h2>
                <p>Content for the right side of the banner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Main Content Column 1</h2>
            <p>Content for the first main column goes here.</p>
          </div>
          <div className="col-md-6">
            <h2>Main Content Column 2</h2>
            <p>Content for the second main column goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColumnComponent;
