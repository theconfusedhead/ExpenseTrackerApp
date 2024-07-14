import React from "react";
import "./Banner.css"; // Make sure this file exists and is in the correct location

const Banner = ({ BGPosition, url, desktopHeight, mobileHeight, children }) => {
  const styles = {
    "--desk-height": desktopHeight || "400px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
    border: "1px solid red",
    "--bg-position": BGPosition,
    "--bg-image": `url(${url})`,
    "--mb-height": mobileHeight || "300px",
  };
  const bannerContent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: '2px solid blue',
    height: 'inherit'
  };
  return (
    <div style={styles} className="banner">
      <div style={bannerContent}>{children}</div>
    </div>
  );
};

export default Banner;
