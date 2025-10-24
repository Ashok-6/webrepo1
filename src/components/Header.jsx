import React from "react";
import logo from "../assets/jnj-logo.png";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "flex-end", // Push logo to the right
        alignItems: "center",
        padding: "10px 20px",
        // borderBottom: "1px solid #ccc",
        backgroundColor: "#fff", // optional for clean look
      }}
    >
      <img src={logo} alt="JnJ Logo" style={{ height: "40px" }} />
    </header>
  );
};

export default Header;
